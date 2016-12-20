import { computed, observable } from 'mobx';

import DeviceConstants from '../constants/device';

export default class Device {
  rfAddress = null;
  serialNumber = null;
  deviceName = null;
  roomId = 0;

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

  constructor({ rfAddress, serialNumber, deviceName, roomId }) {
    this.rfAddress = rfAddress;
    this.serialNumber = serialNumber;
    this.deviceName = deviceName;
    this.roomId = roomId;
  }

  /**
   * Returns true if any of the properties are in an error state
   */
  @computed get hasErrors() {
    return (
      this.valid === DeviceConstants.Valid.INVALID ||
      this.error === DeviceConstants.Error.YES ||
      this.initialised === DeviceConstants.Initialised.NO ||
      this.battery === DeviceConstants.Battery.LOW ||
      this.linkStatus === DeviceConstants.LinkStatus.ERROR
    );
  }
}
