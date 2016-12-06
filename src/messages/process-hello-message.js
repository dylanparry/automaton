export default (data, store) => {
    // Basic properties
    store.setSerialNumber(data[0]);
    store.setRfAddress(data[1]);
    store.setFirmware(data[2].toString('hex'));
    store.setDutyCycle(data[5].toString('hex'));
    store.setFreeMemorySlots(data[6].toString('hex'));

    // The date
    const year = parseInt(data[7].slice(0, 2), 16) + 2000;
    const month = parseInt(data[7].slice(2, 4), 16);
    const day = parseInt(data[7].slice(4), 16);
    store.setCubeDate(`${year}-${month}-${day}`);

    // The time
    const hours = parseInt(data[8].slice(0, 2), 16);
    const minutes = parseInt(data[8].slice(2), 16);
    store.setCubeTime(`${hours}:${minutes}`);
};
