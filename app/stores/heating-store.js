import { action, computed, map, observable } from 'mobx';

import MaxCube from '../house/max-cube';

// Connect to Cube
// Get Rooms
// Monitor Cube Messages
// Update Rooms and Devices within them
// Monitor Rooms to (De)Activate the Thermostat
// Provide Methods for (Dis)Connecting the Cube

export default class HeatingStore {
    @observable cube = null;
    @observable rooms = map();

    constructor() {
        this.cube = new MaxCube({
            ipAddress: '192.168.0.3',
            port: 62910,
        });

        this.cube.listen(data => console.log(data));

        // Connect to the cube, then request device list every 10 seconds
        this.cube.connect().then(() => setInterval(() => {
            this.cube.requestDeviceList();
        }, 10000));
    }

    @action addRoom(room) {
        this.rooms.set(room.id, room);
    }

    @action updateDevice() {

    }

    @computed get thermostatShouldBeActive() {
        return false;
    }
}
