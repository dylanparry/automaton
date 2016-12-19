import React from 'react';
import { Link } from 'react-router';
import { inject, observer, observableArray } from 'mobx-react';

import ClassBuilder from '../../utils/class-builder';
import DeviceConstants from '../../constants/device';

const HeatingTile = ({ heatingStore }) => {
  const tileClass = new ClassBuilder();
  tileClass.tile = 'tile-wide';
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();

  // Work out background colour
  if (!heatingStore.connected) {
    // The cube isn't connected
    tileClass.background = 'bg-grayLight';
  }
  else if (heatingStore.thermostatShouldBeActive) {
    // The thermostat should be active
    tileClass.background = 'bg-lighterBlue';
  }
  else if (!heatingStore.thermostatShouldBeActive && heatingStore.programsAreActive) {
    // The thermostat should not be active, but there are active programs
    tileClass.background = 'bg-amber';
  }
  else {
    // There are no active programs, and the thermostat isn't active
    tileClass.background = 'bg-grayLight';
  }

  let mode = heatingStore.thermostatShouldBeActive ? 'active' : 'auto';
  if (!heatingStore.thermostatShouldBeActive && !heatingStore.programsAreActive) {
    mode = 'off';
  }
  if (!heatingStore.connected) {
    mode = 'cube disconnected';
  }

  // If any device in the house is reporting errors, change the colour and show an icon
  let statusIcon;
  for (let i = 0; i < heatingStore.devices.length; i += 1) {
    const device = heatingStore.devices[i];
    if (
      device.valid === DeviceConstants.Valid.INVALID ||
      device.error === DeviceConstants.Error.YES ||
      device.initialised === DeviceConstants.Initialised.NO ||
      device.battery === DeviceConstants.Battery.LOW ||
      device.linkStatus === DeviceConstants.LinkStatus.ERROR
    ) {
      tileClass.background = 'bg-red';
      mode = 'error';
      statusIcon = <span className="tile-badge top right"><span className="fa fa-fw fa-warning" /></span>;
    }
  }
  if (!heatingStore.connected) {
    statusIcon = <span className="tile-badge top right"><span className="fa fa-fw fa-warning" /></span>;
  }

  return (
    <Link to="/heating">
      <div className={tileClass}>
        <div className="tile-content iconic">
          <span className="icon flaticon-thermostat" />
          <span className="tile-label">Central Heating</span>
          <span className="tile-badge top left">{mode}</span>
          {statusIcon}
        </div>
      </div>
    </Link>
  );
};

HeatingTile.propTypes = {
  heatingStore: React.PropTypes.shape({
    devices: observableArray,
  }).isRequired,
};

export default inject('heatingStore')(observer(HeatingTile));
