import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer, observableArray } from 'mobx-react';

import ClassBuilder from '../../utils/class-builder';

const getBackgroundColour = (heatingStore) =>
{
  if (!heatingStore.connected)
  {
    // The cube isn't connected
    return 'bg-grayLight';
  }
  else if (heatingStore.hasErrors)
  {
    // At least one error was reported
    return 'bg-red';
  }
  else if (heatingStore.thermostatShouldBeActive)
  {
    // The thermostat should be active
    return 'bg-lighterBlue';
  }
  else if (!heatingStore.thermostatShouldBeActive && heatingStore.hasActiveProgram)
  {
    // The thermostat should not be active, but there are active programs
    return 'bg-amber';
  }

  // There are no active programs, and the thermostat isn't active
  return 'bg-grayLight';
};

const getMode = (heatingStore) =>
{
  // If the cube isn't connected
  if (!heatingStore.connected)
  {
    return 'cube disconnected';
  }

  // If any errors were reported
  if (heatingStore.hasErrors)
  {
    return 'error';
  }

  // If the thermostat is off, and all programs are ended
  if (!heatingStore.thermostatShouldBeActive && !heatingStore.hasActiveProgram)
  {
    return 'off';
  }

  // No errors etc, so mode should be 'active' or 'auto'
  return heatingStore.thermostatShouldBeActive ? 'active' : 'auto';
};

const HeatingTile = ({ heatingStore }) =>
{
  const tileClass = new ClassBuilder();
  tileClass.tile = 'tile-wide';
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();
  tileClass.background = getBackgroundColour(heatingStore);

  // If any errors were reported, or the cube isn't connected
  const statusIcon = heatingStore.hasErrors || !heatingStore.connected
    ? <span className="tile-badge top right" > <span className="fa fa-fw fa-warning" /></span>
    : null;

  return (
    <Link to="/heating">
      <div className={tileClass}>
        <div className="tile-content iconic">
          <span className="icon flaticon-thermostat" />
          <span className="tile-label">Central Heating</span>
          <span className="tile-badge top left">{getMode(heatingStore)}</span>
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
