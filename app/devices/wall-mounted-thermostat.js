import { observable } from 'mobx';

import Device from './device';

export default class WallMountedThermostat extends Device {
    @observable valid = null;
    @observable error = null;
    @observable answer = null;
    @observable initialised = null;
    @observable battery = null;
    @observable linkStatus = null;
    @observable panel = null;
    @observable gateway = null;
    @observable dst = null;
    @observable mode = null;
    @observable setPoint = 0;
    @observable actualTemperature = 0;
}
