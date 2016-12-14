import { action, computed, observable } from 'mobx';

import MaxCube from '../house/max-cube';
import MessageProcessor from '../messages/message-processor';
import MetadataMessage from '../messages/metadata-message';
import DeviceListMessage from '../messages/device-list-message';

export default class HeatingStore {
    @observable cube = null;
    @observable rooms = [];
    @observable devices = [];

    constructor() {
        this.cube = new MaxCube({
            ipAddress: '192.168.0.3',
            port: 62910,
        });

        this.cube.listen(data => this.processMessage(data));

        // Connect to the cube, then request device list every 10 seconds
        this.cube.connect().then(() => setInterval(() => {
            this.cube.requestDeviceList();
        }, 10000));
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

    @action updateDevice() {

    }

    @computed get thermostatShouldBeActive() {
        return false;
    }
}
