import { action, computed, map, observable } from 'mobx';

import MaxCube from '../house/max-cube';
import MessageProcessor from '../messages/message-processor';
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
                this.rooms.merge(result.rooms);
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
