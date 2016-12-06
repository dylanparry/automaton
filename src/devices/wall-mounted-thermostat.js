import { action, observable } from 'mobx';

import Device from './device';
import { Status } from '../constants';

export default class WallMountedThermostat extends Device {
    @observable valid = Status.Valid.VALID;
    @observable error = Status.Error.NO;
    @observable answer = Status.Answer.NO;
    @observable initialised = Status.Initialised.YES;
    @observable battery = Status.Battery.OK;
    @observable linkStatus = Status.LinkStatus.OK;
    @observable panel = Status.Panel.UNLOCKED;
    @observable gateway = Status.Gateway.KNOWN;
    @observable dst = Status.DayLightSavings.INACTIVE;
    @observable mode = Status.Mode.AUTO;
    @observable setPoint = 0;
    @observable actualTemperature = 0;

    @action update(data) {
        Object.assign(this, data);
    }
}
