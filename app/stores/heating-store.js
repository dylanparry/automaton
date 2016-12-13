import { action, computed, map, observable } from 'mobx';

import MaxCube from '../house/max-cube';
import MetadataMessage from '../messages/metadata-message';

export default class HeatingStore {
    @observable cube = null;
    @observable rooms = map();
    @observable devices = map();

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
        const pattern = /([A-Z]):([A-Za-z0-9+/=,]+)/g;

        let message = pattern.exec(data);
        while (message !== null) {
            // Get the header and value
            const header = message[1];
            const value = message[2];

            // Proccess the message according to its type
            switch (header) {
                case 'M':
                    // If the current part isn't the final part
                    if (parseInt(value.slice(0, 2), 16) !== parseInt(value.slice(3, 5), 16) - 1) {
                        // If this is the first part of the message
                        if (parseInt(value.slice(0, 2), 16) === 0) {
                            // Set the buffer to a new string
                            this.metadataBuffer = value.slice(6);
                        }
                        else {
                            // ADd the message to the buffer
                            this.metadataBuffer += value.slice(6);
                        }
                    }
                    else {
                        // We've got the full message, so process it
                        const metadataMessage = new MetadataMessage(
                            this.metadataBuffer || value.slice(6),
                        );

                        // Merge the resulting rooms
                        this.rooms.merge(metadataMessage.rooms);
                    }
                    break;
                default:
                    break;
            }

            // Get the next match
            message = pattern.exec(data);
        }
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
