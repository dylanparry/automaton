import { map } from 'mobx';

import Room from '../house/room';
import RadiatorThermostat from '../devices/radiator-thermostat';
import WallMountedThermostat from '../devices/wall-mounted-thermostat';

export default class MetadataMessage {
    constructor(data) {
        // Create a Base64 buffer from the data
        let buffer = new Buffer(data, 'base64');

        // Get the number of rooms
        const roomCount = buffer[2];
        buffer = buffer.slice(3);

        // Get details of each rooms
        for (let i = 0; i < roomCount; i += 1) {
            const id = parseInt(buffer[0], 10);
            const nameLength = buffer[1];
            const name = buffer.slice(2, nameLength + 2).toString('utf-8');
            const rfAddress = buffer.slice(nameLength + 2, nameLength + 5).toString('hex');

            const room = new Room({
                id,
                name,
                rfAddress,
            });

            this._rooms.set(id, room);

            buffer = buffer.slice(nameLength + 5);
        }

        // Get the number of devices
        const deviceCount = buffer[0];
        buffer = buffer.slice(1);

        // Get details of each device
        for (let i = 0; i < deviceCount; i += 1) {
            // Get device properties
            const deviceType = buffer[0];
            const rfAddress = buffer.slice(1, 4).toString('hex');
            const serialNumber = buffer.slice(4, 14).toString('utf-8');
            const deviceName = buffer.slice(15, buffer[14] + 15).toString('utf-8');
            const roomId = buffer[buffer[14] + 15];

            let device;

            switch (deviceType) {
                case 1:
                case 2:
                    device = new RadiatorThermostat({
                        rfAddress,
                        serialNumber,
                        deviceName,
                        roomId,
                    });
                    break;
                case 3:
                    device = new WallMountedThermostat({
                        rfAddress,
                        serialNumber,
                        deviceName,
                        roomId,
                    });
                    break;
                case 4:
                    device = null; // Should be a Window
                    break;
                case 5:
                    device = null; // Should be an ECO Button
                    break;
                default:
                    device = null;
            }

            if (device !== null) {
                // Get the room
                const room = this._rooms.get(roomId);

                if (typeof room !== 'undefined') {
                    // Add the device to the room
                    room.devices.set(rfAddress, device);
                }
            }

            // Remove the current device from the buffer
            buffer = buffer.slice(buffer[14] + 16);
        }
    }

    _rooms = map();
    get rooms() {
        return this._rooms;
    }
}
