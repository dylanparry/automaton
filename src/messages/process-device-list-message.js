import leftpad from 'leftpad';

import Convert from '../utils/convert';

const processRadiatorThermostat = (buffer) => {
    const rfAddress = buffer.slice(1, 4).toString('hex');

    const flags = `${leftpad(parseInt(buffer.slice(5, 6).toString('hex'), 16).toString(2), 8)}${leftpad(parseInt(buffer.slice(6, 7).toString('hex'), 16).toString(2), 8)}`;
    const valid = flags[3];
    const error = flags[4];
    const answer = flags[5];
    const initialised = flags[6];
    const battery = flags[8];
    const linkStatus = flags[9];
    const panel = flags[10];
    const gateway = flags[11];
    const dst = flags[12];
    const mode = parseInt(flags.substr(14), 2);

    const valvePosition = parseInt(buffer.slice(7, 8).toString('hex'), 16);

    const setPoint = parseInt(buffer.slice(8, 9).toString('hex'), 16) / 2;

    return {
        rfAddress,
        valid,
        error,
        answer,
        initialised,
        battery,
        linkStatus,
        panel,
        gateway,
        dst,
        mode,
        valvePosition,
        setPoint,
        lastUpdated: new Date(),
    };
};

const processWallMountedThermostat = (buffer) => {
    const rfAddress = buffer.slice(1, 4).toString('hex');

    const flags = `${leftpad(parseInt(buffer.slice(5, 6).toString('hex'), 16).toString(2), 8)}${leftpad(parseInt(buffer.slice(6, 7).toString('hex'), 16).toString(2), 8)}`;
    const valid = flags[3];
    const error = flags[4];
    const answer = flags[5];
    const initialised = flags[6];
    const battery = flags[8];
    const linkStatus = flags[9];
    const panel = flags[10];
    const gateway = flags[11];
    const dst = flags[12];
    const mode = parseInt(flags.substr(14), 2);

    const setPoint = parseInt(buffer.slice(8, 9).toString('hex'), 16) / 2;

    const actualTemperature = parseInt(`${Convert.hexBufferToBinaryString(buffer.slice(8, 9), 8)[0]}${Convert.hexBufferToBinaryString(buffer.slice(12, 13), 8)}`, 2) / 10;

    return {
        rfAddress,
        valid,
        error,
        answer,
        initialised,
        battery,
        linkStatus,
        panel,
        gateway,
        dst,
        mode,
        setPoint,
        actualTemperature,
        lastUpdated: new Date(),
    };
};

export default (data, store) => {
    // Loop through the data and pull out each sub message
    let buffer = new Buffer(data, 'base64');

    while (buffer.length > 0) {
        // Variable for calculating the temperature

        switch (buffer[0]) {
            case 8:
                // An ECO Button
                store.updateDevice({
                });
                break;
            case 11:
                // A radiator thermostat
                store.updateDevice(processRadiatorThermostat(buffer));
                break;
            case 12:
                // A wall mounted thermostat
                store.updateDevice(processWallMountedThermostat(buffer));
                break;
            default:
                break;
        }

        // Go to the next item in the buffer
        buffer = buffer.slice(buffer[0] + 1);
    }
};
