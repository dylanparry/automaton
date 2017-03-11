import { computed, observable } from 'mobx';

import Device from './device';

export default class RadiatorThermostat extends Device
{
  @observable valvePosition = 0;
  active = false;

  /*
   * When a radiator valve opens to 40%, the radiator is considered to be 'on'. It
   * is then in an 'on' state until the valve closes completely. This ensures that the boiler
   * is not fired up unnecessarily and also allows the room to heat up beyond the target temperature
   * so that it doesn't drop below it as soon as the heating starts to cool down
   */
  @computed get isOn()
  {
    if (!this.active && this.valvePosition >= 40)
    {
      // The heating isn't currently on, but the valves have opened
      this.active = true;
    }
    else if (this.active && this.valvePosition === 0)
    {
      // The heating is already on, and the valve has now closed
      this.active = false;
    }

    // Return state of radiator
    return this.active;
  }
}
