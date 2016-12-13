export default class Device {
    rfAddress = null;
    serialNumber = null;
    deviceName = null;
    roomId = 0;

    constructor({ rfAddress, serialNumber, deviceName, roomId }) {
        this.rfAddress = rfAddress;
        this.serialNumber = serialNumber;
        this.deviceName = deviceName;
        this.roomId = roomId;
    }
}
