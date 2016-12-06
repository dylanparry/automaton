import request from 'request';
import { action, computed, map, observable, reaction } from 'mobx';

import { Status } from './constants';
import MaxCube from './devices/max-cube';

import Gpio from './utils/gpio';

// Get the API key from environment variables
const OpenWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

export default class Store {
    cube;
    metaDataInterval;

    constructor() {
        // Turn the thermostat off
        Gpio.setInactive();

        /*
        * Create a new Cube with the given IP address and port number
        */
        this.cube = new MaxCube('192.168.0.3', 62910, this);

        // Connect to the cube, then start requesting updates from it
        this.connectCube();

        // React to changes in "this.thermostatIsActive"
        reaction(() => this.thermostatIsActive, () => null);

        // Get the latest weather data, then again every five minutes
        this.getWeatherData();
        setInterval(() => {
            this.getWeatherData();
        }, 300000);
    }

    getWeatherData() {
        request(`http://api.openweathermap.org/data/2.5/forecast/daily?cnt=1&q=${this.location}&units=metric&apikey=${OpenWeatherApiKey}`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                this.setWeatherDataDaily(JSON.parse(body));
            }
        });

        request(`http://api.openweathermap.org/data/2.5/weather?q=${this.location}&units=metric&apikey=${OpenWeatherApiKey}`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                this.setWeatherDataCurrent(JSON.parse(body));
            }
        });
    }

    connectCube() {
        this.cube.connect().then(() => {
            this.metaDataInterval = setInterval(() => {
                // Get a device list every 10 seconds
                this.cube.sendRequest('l');
            }, 10000);
        });
    }

    disconnectCube() {
        this.cube.disconnect();
    }

    @observable message = null;
    @observable messageCount = 0;

    @observable rooms = map();

    // Cube properties
    @observable serialNumber = null;
    @observable rfAddress = null;
    @observable firmware = null;
    @observable dutyCycle = null;
    @observable freeMemorySlots = null;
    @observable cubeDate = null;
    @observable cubeTime = null;

    // Weather
    @observable location = 'gloucester,uk';
    @observable weatherDataCurrent = null;
    @observable weatherDataDaily = null;

    @action
    setSerialNumber(value) {
        this.serialNumber = value;
    }

    @action setRfAddress(value) {
        this.rfAddress = value;
    }

    @action setFirmware(value) {
        this.firmware = value;
    }

    @action setDutyCycle(value) {
        this.dutyCycle = value;
    }

    @action setFreeMemorySlots(value) {
        this.freeMemorySlots = value;
    }

    @action setCubeDate(value) {
        this.cubeDate = value;
    }

    @action setCubeTime(value) {
        this.cubeTime = value;
    }

    @action setMessage(message) {
        this.message = message;
        this.messageCount += 1;
    }

    @action addRoom(room) {
        this.rooms.set(room.id, room);
    }

    @action updateDevice(data) {
        let device;

        // Try and find the device
        this.rooms.forEach((item) => {
            if (item.devices.has(data.rfAddress)) {
                device = item.devices.get(data.rfAddress);
            }
        });

        if (typeof device !== 'undefined') {
            device.update(data);
        }
    }

    @action emergencyShutdown() {
        // Remove all rooms and devices, thermostatIsActive should recalculate and shut down
        // the thermostat as there are no rooms with heating devices
        this.rooms.clear();

        // Stop sending requests to the cube
        clearInterval(this.metaDataInterval);
    }

    @computed get thermostatIsActive() {
        let shouldBeActive = false;

        // Get an array of rooms
        const rooms = this.rooms.values();

        // Loop through the rooms
        for (let i = 0; i < rooms.length; i += 1) {
            const room = rooms[i];

            // Do any of the devices in the room have an open valve?
            const devices = room.devices.values().filter(
                device => device.valvePosition && device.valvePosition >= 20, // 20% open or more
            );

            // If any devices were found, then break the loop early
            if (devices.length > 0) {
                // The thermostat should be active!
                shouldBeActive = true;
                break;
            }
        }

        // Now for a safety check, ensure that no rooms are in error state
        for (let i = 0; i < rooms.length; i += 1) {
            const room = rooms[i];

            // Check that the room's devices have all reported within the last five mins
            const devices = room.devices.values().filter((device) => {
                const now = new Date();
                const then = device.lastUpdated;

                // Get the number of seconds difference
                const difference = now.getTime() - then.getTime();

                return difference >= 300000;
            });

            // If any devices haven't reported within five minutes
            if (devices.length > 0) {
                // The thermostat should not be active!
                shouldBeActive = false;
                break;
            }

            // If any errors are found, break the loop early
            if (room.valid === Status.Valid.INVALID
                || room.error === Status.Error.YES
                || room.battery === Status.Battery.LOW
                || room.linkStatus === Status.LinkStatus.Error) {
                // There was an error, so thermostat should not be active!
                shouldBeActive = false;
                break;
            }
        }

        if (shouldBeActive) {
            Gpio.setActive();
            return true;
        }

        Gpio.setInactive();
        return false;
    }

    @action setLocation(value) {
        this.location = value;
    }

    @action setWeatherDataCurrent(value) {
        this.weatherDataCurrent = value;
    }

    @action setWeatherDataDaily(value) {
        this.weatherDataDaily = value;
    }
}
