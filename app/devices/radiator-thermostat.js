import { observable } from 'mobx';

import Device from './device';

export default class RadiatorThermostat extends Device {
  @observable valvePosition = 0;
}
