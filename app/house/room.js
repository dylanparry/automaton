import { computed, observable } from 'mobx';

import DeviceConstants from '../constants/device';
import WallMountedThermostat from '../devices/wall-mounted-thermostat';
import RadiatorThermostat from '../devices/radiator-thermostat';

export default class Room {
  id = 0;
  name = '';
  rfAddress = '';

  @observable devices = [];

  constructor({ id, name, rfAddress }) {
    this.id = id;
    this.name = name;
    this.rfAddress = rfAddress;
  }

  /**
   * Returns the temperature that the room is set to reach
   */
  @computed get setPoint() {
    // Use the temperature from the first radiator found as they'll all be set the same
    const radiator = this.devices.find(
      device => device instanceof RadiatorThermostat,
    );

    if (typeof radiator !== 'undefined') {
      return radiator.setPoint;
    }

    return null;
  }

  /**
   * Returns the temperature that the room is currently at
   */
  @computed get actualTemperature() {
    const thermostat = this.devices.find(
      device => device instanceof WallMountedThermostat,
    );

    if (typeof thermostat !== 'undefined') {
      return thermostat.actualTemperature;
    }

    return null;
  }

  /**
   * Returns the valve position for the radiators in the room
   */
  @computed get radiatorsOn() {
    const radiators = this.devices.filter(device => device instanceof RadiatorThermostat);

    let sum = 0;
    for (let i = 0; i < radiators.length; i += 1) {
      sum += radiators[i].valvePosition;
    }

    return sum / radiators.length >= 20;
  }

  /**
   * Return true if the room is considered cold
   */
  @computed get isCold() {
    // Some rooms can't report their temperature, and will report it as zero
    if (this.actualTemperature > 0) {
      // A temperature was report and it's lower than the set point
      if (this.actualTemperature < this.setPoint) {
        // It's cold!
        return true;
      }

      // It's not cold!
      return false;
    }

    // Assume it is cold
    return true;
  }

  @computed get mode() {
    // Get the first device
    const device = this.devices[0];

    return device.mode;
  }

  /**
   * Returns true if any device in the room is reporting a status error
   */
  @computed get hasErrors() {
    // Loop through each device in the room
    for (let i = 0; i < this.devices.length; i += 1) {
      const device = this.devices[i];

      // If it's reporting an error of any sort, return true and end function early
      if (device.hasErrors) {
        return true;
      }
    }

    // No devices reported errors, so return false
    return false;
  }
}
