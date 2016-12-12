import { map } from 'mobx';

import Room from '../house/room';

export default class MetadataMessage {
    constructor(data) {
        // Create a Base64 buffer from the data
        let buffer = new Buffer(data, 'base64');

        // Get the number of rooms
        const roomCount = buffer[2];
        buffer = buffer.slice(3);

        // Get details of each rooms
        for (let i = 0; i < roomCount; i += 1) {
            const id = buffer[0];
            const nameLength = buffer[1];
            const name = buffer.slice(2, nameLength + 2).toString('utf-8');
            const rfAddress = buffer.slice(nameLength + 2, nameLength + 5).toString('hex');

            const room = new Room({
                id,
                name,
                rfAddress,
            });

            this._rooms.set(rfAddress, room);

            buffer = buffer.slice(nameLength + 5);
        }

        // Get the number of devices
        const deviceCount = buffer[0];
        buffer = buffer.slice(1);

        // Get details of each device
        for (let i = 0; i < deviceCount; i += 1) {
            // Create a device and add it to the list
        }
    }

    _rooms = map();
    get rooms() {
        return this._rooms;
    }
}
