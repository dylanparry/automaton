import { observable } from 'mobx';

export default class Device {
    rfAddress = '';
    serialNumber = '';
    deviceName = '';
    roomId = 0;
    @observable lastUpdated = new Date();

    constructor({ rfAddress, serialNumber, deviceName, roomId }) {
        this.rfAddress = rfAddress;
        this.serialNumber = serialNumber;
        this.deviceName = deviceName;
        this.roomId = roomId;
    }
}
