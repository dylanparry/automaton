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
  @computed get hasNoErrors() {
    return (
      this.valid === DeviceConstants.Valid.VALID &&
      this.error === DeviceConstants.Error.NO &&
      this.initialised === DeviceConstants.Initialised.YES &&
      this.battery === DeviceConstants.Battery.OK &&
      this.linkStatus === DeviceConstants.LinkStatus.OK
    );
  }
}
