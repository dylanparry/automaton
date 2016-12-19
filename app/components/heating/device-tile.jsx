import React from 'react';
import { observer } from 'mobx-react';

import Device from '../../devices/device';
import WallMountedThermostat from '../../devices/wall-mounted-thermostat';
import RadiatorThermostat from '../../devices/radiator-thermostat';
import ClassBuilder from '../../utils/class-builder';
import DeviceConstants from '../../constants/device';

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

  // Display icons for any errors
  const statusIcons = [];
  if (device.valid === DeviceConstants.Valid.INVALID) {
    statusIcons.push(<span className="fa fa-fw fa-close" />);
  }
  if (device.error === DeviceConstants.Error.YES) {
    statusIcons.push(<span className="fa fa-fw fa-warning" />);
  }
  if (device.initialised === DeviceConstants.Initialised.NO) {
    statusIcons.push(<span className="fa fa-fw fa-ban" />);
  }
  if (device.battery === DeviceConstants.Battery.LOW) {
    statusIcons.push(<span className="fa fa-fw fa-battery-quarter" />);
  }
  if (device.linkStatus === DeviceConstants.LinkStatus.ERROR) {
    statusIcons.push(<span className="fa fa-fw fa-wifi" />);
  }

  let statusIcon;
  if (statusIcons.length > 0) {
    statusIcon = <span className="tile-badge top right">{statusIcons}</span>;
  }
  else {
    statusIcon = <span className="tile-badge top right"><span className="fa fa-fw fa-check" /></span>;
  }

  // Otherwise, it's a radiator
  return (
    <div className={tileClass}>
      <div className="tile-content iconic">
        <span className={iconClass} />
        <span className="tile-label">{device.deviceName}</span>
        {badge}
        {statusIcon}
      </div>
    </div>
  );
};

DeviceTile.propTypes = {
  device: React.PropTypes.instanceOf(Device).isRequired,
};

export default observer(DeviceTile);
