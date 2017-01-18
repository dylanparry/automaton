import React from 'react';
import { observer } from 'mobx-react';

import Device from '../../devices/device';
import WallMountedThermostat from '../../devices/wall-mounted-thermostat';
import RadiatorThermostat from '../../devices/radiator-thermostat';
import ClassBuilder from '../../utils/class-builder';
import DeviceConstants from '../../constants/device';

const getDeviceIcon = (device) => {
  if (device instanceof WallMountedThermostat) {
    return 'flaticon-thermostat';
  }

  if (device instanceof RadiatorThermostat) {
    return 'flaticon-radiator';
  }

  return null;
};

const getDeviceBadge = (device) => {
  if (device instanceof RadiatorThermostat) {
    return <span className="tile-badge">{device.valvePosition}%</span>;
  } else if (device instanceof WallMountedThermostat) {
    return <span className="tile-badge">{device.setPoint > 5 ? `${device.setPoint}°C` : 'off'}</span>;
  }

  return null;
};

const getStatusIcons = (device) => {
  const statusIcons = [];

  const tests = [
    ['valid', DeviceConstants.Valid.INVALID, 'close'],
    ['error', DeviceConstants.Error.YES, 'warning'],
    ['initialised', DeviceConstants.Initialised.NO, 'ban'],
    ['battery', DeviceConstants.Battery.LOW, 'battery-quarter'],
    ['linkStatus', DeviceConstants.LinkStatus.ERROR, 'wifi'],
  ];

  for (let i = 0; i < tests.length; i += 1) {
    const test = tests[i];

    if (device[test[0]] === test[1]) {
      statusIcons.push(<span className={`fa fa-fw fa-${test[2]}`} />);
    }
  }

  return statusIcons;
};

const DeviceTile = ({ device }) => {
  const tileClass = new ClassBuilder();
  tileClass.tile = 'tile';
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();

  // Choose the background colour
  tileClass.background = device.hasErrors
    ? 'bg-red'
    : 'bg-green';

  const iconClass = new ClassBuilder();
  iconClass.useIcon();
  iconClass.iconName = getDeviceIcon(device);

  // Display icons for any errors
  const statusIcon = getStatusIcons(device).length > 0
    ? (<span className="tile-badge top right">{getStatusIcons(device)}</span>)
    : (<span className="tile-badge top right"><span className="fa fa-fw fa-check" /></span>);

  // Otherwise, it's a radiator
  return (
    <div className={tileClass}>
      <div className="tile-content iconic">
        <span className={iconClass} />
        <span className="tile-label">{device.deviceName}</span>
        {getDeviceBadge(device)}
        {statusIcon}
      </div>
    </div>
  );
};

DeviceTile.propTypes = {
  device: React.PropTypes.instanceOf(Device).isRequired,
};

export default observer(DeviceTile);
