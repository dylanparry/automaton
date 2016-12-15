import { action, computed, observable, reaction } from 'mobx';

import MaxCube from '../house/max-cube';
import MessageProcessor from '../messages/message-processor';
import MetadataMessage from '../messages/metadata-message';
import DeviceListMessage from '../messages/device-list-message';
import Gpio from '../utils/gpio';

export default class HeatingStore {
    @observable cube = null;
    @observable rooms = [];
    @observable devices = [];

    constructor() {
        this.cube = new MaxCube({
            ipAddress: process.env.NODE_ENV === 'test' ? '127.0.0.1' : '192.168.0.3',
            port: 62910,
        });

        this.cube.listen(data => this.processMessage(data));

        // Connect to the cube, then request device list every 10 seconds
        this.cube.connect().then(() => setInterval(() => {
            this.cube.requestDeviceList();
        }, 10000));

        // Need to watch this.thermostatShouldBeActive for any changes
        reaction(() => this.thermostatShouldBeActive, () => null);
    }

    @action processMessage(data) {
        // Sometimes we get more than one message at the same time
        const pattern = /[A-Z]:[A-Za-z0-9+/=,]+/g;

        // Get the first match
        let match = pattern.exec(data);

        // While there are matches
        while (match !== null) {
            // Process the match
            const result = MessageProcessor.process(match[0]);

            // If the returned message is a metadata message
            if (result instanceof MetadataMessage) {
                // Merge the rooms with the local copy
                this.rooms.replace(result.rooms);
                this.devices.replace(result.devices);
            }

            // If the returned message is a device list message
            if (result instanceof DeviceListMessage) {
                // Loop through the updates and apply them to each device
                for (let i = 0; i < result.updates.length; i += 1) {
                    // Find the device to update
                    const device = this.devices.find(
                        d => d.rfAddress === result.updates[i].rfAddress,
                    );

                    // If a device was found, update it
                    if (typeof device !== 'undefined') {
                        Object.assign(device, result.updates[i]);
                    }
                }
            }

            // Get the next match
            match = pattern.exec(data);
        }
    }

    @computed get thermostatShouldBeActive() {
        // Get the number of open valves
        const openValves = this.devices.filter(device => device.valvePosition >= 20).length;

        // Get the number of devices reporting errors
        const devicesInErrorState = this.devices.filter(device => !device.hasNoErrors).length;

        // Check if thermostat should be active
        const thermostatShouldBeActive = openValves > 0 && devicesInErrorState === 0;

        // Turn the thermostat on or off
        if (thermostatShouldBeActive) {
            Gpio.setActive();
        }
        else {
            Gpio.setInactive();
        }

        return thermostatShouldBeActive;
    }

    @computed get programsAreActive() {
        const devices = this.devices.filter(device => device.setPoint > 10);

        return devices.length > 0;
    }
}
