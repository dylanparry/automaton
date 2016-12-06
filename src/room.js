import { action, computed, map, observable } from 'mobx';

import { Status } from './constants';
import RadiatorThermostat from './devices/radiator-thermostat';
import WallMountedThermostat from './devices/wall-mounted-thermostat';

export default class Room {
    id = 0;
    name = '';
    rfAddress = '';

    @observable devices = map();

    constructor({ id, name, rfAddress }) {
        this.id = id;
        this.name = name;
        this.rfAddress = rfAddress;
    }

    // Adds a device to the device map
    @action addDevice(device) {
        this.devices.set(device.rfAddress, device);
    }

    // Updates a device in the device map
    @action updateDevice(deviceUpdateData) {
        // Get the device
        const device = this.devices.get(deviceUpdateData.rfAddress);

        // Update it
        device.update(deviceUpdateData);
    }

    @computed get setPoint() {
        const thermostat = this.devices.values().find(
            device => device instanceof RadiatorThermostat,
        );

        if (typeof thermostat === 'undefined') {
            return 0;
        }

        return thermostat.setPoint;
    }

    @computed get actualTemperature() {
        const thermostat = this.devices.values().find(
            device => device instanceof WallMountedThermostat,
        );

        if (typeof thermostat === 'undefined') {
            return 0;
        }

        return thermostat.actualTemperature;
    }

    @computed get radiatorsAreOn() {
        const radiators = this.devices.values().filter(
            device => device instanceof RadiatorThermostat,
        );

        for (let i = 0; i < radiators.length; i += 1) {
            if (radiators[i].valvePosition >= 20) { // On if the valve is 20% open or more
                return true;
            }
        }

        return false;
    }

    @computed get valid() {
        const devices = this.devices.values().filter(
            device => device.valid === Status.Valid.INVALID,
        );

        if (devices.length === 0) {
            // No invalid devices reported
            return Status.Valid.VALID;
        }

        // There was at least one invalid device reported
        return Status.Valid.INVALID;
    }

    @computed get error() {
        const devices = this.devices.values().filter(
            device => device.error === Status.Error.YES,
        );

        if (devices.length === 0) {
            // No errors reported
            return Status.Error.NO;
        }

        // There was at least one error reported
        return Status.Error.YES;
    }

    @computed get battery() {
        const devices = this.devices.values().filter(
            device => device.battery === Status.Battery.LOW,
        );

        if (devices.length === 0) {
            // All batteries are OK
            return Status.Battery.OK;
        }

        // There was at least one low battery
        return Status.Battery.LOW;
    }

    @computed get linkStatus() {
        const devices = this.devices.values().filter(
            device => device.linkStatus === Status.LinkStatus.ERROR,
        );

        if (devices.length === 0) {
            // All link status errors reported
            return Status.LinkStatus.ERROR;
        }

        // There was at least one link error statu
        return Status.LinkStatus.ERROR;
    }

    @computed get mode() {
        // No devices yet, so return AUTO mode
        if (this.devices.values().length === 0) {
            return Status.Mode.AUTO;
        }

        // Get the wall mounted thermostat if there is one
        const wallMountedThermostat = this.devices.values().find(
            device => device instanceof WallMountedThermostat,
        );

        if (typeof wallMountedThermostat !== 'undefined') {
            // Return the mode from the wall mounted thermostat
            return wallMountedThermostat.mode;
        }

        // There was no wall mounted thermostat, so return the mode of the first device
        return this.devices.values()[0].mode;
    }
}
