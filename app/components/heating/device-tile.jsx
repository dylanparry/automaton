import React from 'react';
import { observer } from 'mobx-react';

import Device from '../../devices/device';
import WallMountedThermostat from '../../devices/wall-mounted-thermostat';
import RadiatorThermostat from '../../devices/radiator-thermostat';
import ClassBuilder from '../../utils/class-builder';

const DeviceTile = ({ device }) => {
    const tileClass = new ClassBuilder();
    tileClass.tile = 'tile';
    tileClass.color = 'fg-white';
    tileClass.useTextShadow();

    // Choose the background colour
    if (device.hasNoErrors) {
        tileClass.background = 'bg-green';
    }
    else {
        tileClass.background = 'bg-red';
    }

    const iconClass = new ClassBuilder();
    iconClass.useIcon();

    let badge = null;
    if (device instanceof WallMountedThermostat) {
        iconClass.iconName = 'flaticon-thermostat';
    }
    else if (device instanceof RadiatorThermostat) {
        iconClass.iconName = 'flaticon-radiator';
        badge = <span className="tile-badge">{device.valvePosition}%</span>;
    }

    // Otherwise, it's a radiator
    return (
        <div className={tileClass}>
            <div className="tile-content iconic">
                <span className={iconClass} />
                <span className="tile-label">{device.deviceName}</span>
                {badge}
            </div>
        </div>
    );
};

DeviceTile.propTypes = {
    device: React.PropTypes.instanceOf(Device),
};

export default observer(DeviceTile);
