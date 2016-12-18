import { observable } from 'mobx';

import Device from './device';

export default class WallMountedThermostat extends Device {
  @observable actualTemperature = 0;
}
