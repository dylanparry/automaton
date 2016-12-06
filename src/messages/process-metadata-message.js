import Room from '../room';

import RadiatorThermostat from '../devices/radiator-thermostat';
import WallMountedThermostat from '../devices/wall-mounted-thermostat';
import EcoButton from '../devices/eco-button';

export default (data, store) => {
    let buffer = new Buffer(data, 'base64');

    // Get the room count and slice the data
    const roomCount = buffer[2];
    buffer = buffer.slice(3);

    // Loop through the rooms
    for (let i = 0; i < roomCount; i += 1) {
        const id = buffer[0];
        const roomNameLength = buffer[1];
        const name = buffer.slice(2, roomNameLength + 2).toString('utf-8');
        const rfAddress = buffer.slice(roomNameLength + 2, roomNameLength + 5).toString('hex');

        const room = new Room({
            id,
            name,
            rfAddress,
        });

        store.addRoom(room);

        buffer = buffer.slice(roomNameLength + 5);
    }

    // Get the device count and slice the data
    const deviceCount = buffer[0];
    buffer = buffer.slice(1);

    // Loop through the devices
    for (let i = 0; i < deviceCount; i += 1) {
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
                device = new EcoButton();
                break;
            default:
                device = null;
        }

        if (device !== null) {
            // Get the room
            const room = store.rooms.get(roomId);

            if (typeof room !== 'undefined') {
                // Add the device to the room
                room.addDevice(device);
            }
        }

        // Remove the current device from the buffer
        buffer = buffer.slice(buffer[14] + 16);
    }
};
