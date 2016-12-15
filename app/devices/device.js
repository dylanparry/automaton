import { computed, observable } from 'mobx';

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
            this.valid === 1 &&
            this.error === 0 &&
            this.initialised === 1 &&
            this.battery === 0 &&
            this.linkStatus === 0
        );
    }
}
