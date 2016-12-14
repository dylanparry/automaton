import { computed, observable } from 'mobx';

import WallMountedThermostat from '../devices/wall-mounted-thermostat';

export default class Room {
    id = 0;
    name = '';
    rfAddress = '';

    @observable devices = [];

    constructor({ id, name, rfAddress }) {
        this.id = id;
        this.name = name;
        this.rfAddress = rfAddress;
    }

    /**
     * Returns the temperature that the room is set to reach
     */
    @computed get setPoint() {
        const thermostat = this.devices.find(
            device => device instanceof WallMountedThermostat,
        );

        if (typeof thermostat !== 'undefined') {
            return `${thermostat.setPoint}°C`;
        }

        return null;
    }

    /**
     * Returns the temperature that the room is currently at
     */
    @computed get actualTemperature() {
        const thermostat = this.devices.find(
            device => device instanceof WallMountedThermostat,
        );

        if (typeof thermostat !== 'undefined') {
            return `${thermostat.actualTemperature}°C`;
        }

        return null;
    }
}
