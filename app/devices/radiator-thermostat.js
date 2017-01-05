import { computed, observable } from 'mobx';

import Device from './device';

export default class RadiatorThermostat extends Device {
  @observable valvePosition = 0;
  active = false;

  /*
   * When a radiator valve opens to 40%, the radiator is considered to be 'on'. It
   * is then in an 'on' state until the valve closes completely. This ensures that the boiler
   * is not fired up unnecessarily and also allows the room to heat up beyond the target temperature
   * so that it doesn't drop below it as soon as the heating starts to cool down
   */
  @computed get isOn() {
    // When not active, check if the valve has opened enough
    if (!this.active && this.valvePosition >= 40) {
      this.active = true;
    }
    // When already active, check if the valve has closed
    else if (this.active && this.valvePosition === 0) {
      this.active = false;
    }

    // Return state of radiator
    return this.active;
  }
}
