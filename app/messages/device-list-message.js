import leftpad from 'leftpad';

const hexBufferToBinaryString = (buffer, length) => leftpad(parseInt(buffer.toString('hex'), 16).toString(2), length);

const radiatorThermostatUpdate = (buffer) =>
{
  const rfAddress = buffer.slice(1, 4).toString('hex');

  const flags = `${leftpad(parseInt(buffer.slice(5, 6).toString('hex'), 16).toString(2), 8)}${leftpad(parseInt(buffer.slice(6, 7).toString('hex'), 16).toString(2), 8)}`;
  const valid = parseInt(flags[3], 2);
  const error = parseInt(flags[4], 2);
  const answer = parseInt(flags[5], 2);
  const initialised = parseInt(flags[6], 2);
  const battery = parseInt(flags[8], 2);
  const linkStatus = parseInt(flags[9], 2);
  const panel = parseInt(flags[10], 2);
  const gateway = parseInt(flags[11], 2);
  const dst = parseInt(flags[12], 2);
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
  };
};

const wallMountedThermostatUpdate = (buffer) =>
{
  const rfAddress = buffer.slice(1, 4).toString('hex');

  const flags = `${leftpad(parseInt(buffer.slice(5, 6).toString('hex'), 16).toString(2), 8)}${leftpad(parseInt(buffer.slice(6, 7).toString('hex'), 16).toString(2), 8)}`;
  const valid = parseInt(flags[3], 2);
  const error = parseInt(flags[4], 2);
  const answer = parseInt(flags[5], 2);
  const initialised = parseInt(flags[6], 2);
  const battery = parseInt(flags[8], 2);
  const linkStatus = parseInt(flags[9], 2);
  const panel = parseInt(flags[10], 2);
  const gateway = parseInt(flags[11], 2);
  const dst = parseInt(flags[12], 2);
  const mode = parseInt(flags.substr(14), 2);

  const setPoint = parseInt(buffer.slice(8, 9).toString('hex'), 16) / 2;

  const actualTemperature = parseInt(`${hexBufferToBinaryString(buffer.slice(8, 9), 8)[0]}${hexBufferToBinaryString(buffer.slice(12, 13), 8)}`, 2) / 10;

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
  };
};

export default class DeviceListMessage
{
  constructor(data)
  {
    // Loop through the data and pull out each sub message
    let buffer = new Buffer(data, 'base64');

    while (buffer.length > 0)
    {
      // Variable for calculating the temperature

      switch (buffer[0])
      {
        case 8:
          // An ECO Button
          break;
        case 11:
          // A radiator thermostat
          this.updates.push(radiatorThermostatUpdate(buffer));
          break;
        case 12:
          // A wall mounted thermostat
          this.updates.push(wallMountedThermostatUpdate(buffer));
          break;
        default:
          break;
      }

      // Go to the next item in the buffer
      buffer = buffer.slice(buffer[0] + 1);
    }
  }

  updates = [];
}
