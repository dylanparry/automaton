import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

import DeviceConstants from '../../constants/device';
import ClassBuilder from '../../utils/class-builder';
import Room from '../../house/room';

const getBackgroundColour = (room) =>
{
  // Check for errors
  if (room.hasErrors)
  {
    return 'bg-red';
  }

  // When the radiators are on, and the room is cold
  if (room.radiatorsOn && room.isCold)
  {
    return 'bg-lighterBlue';
  }

  // If there are active programs, and the room is warm
  if (room.hasActiveProgram)
  {
    return 'bg-amber';
  }

  // Otherwise, just colour it grey
  return 'bg-grayLight';
};

const getMode = (room) =>
{
  // Check for errors
  if (room.hasErrors)
  {
    return 'error';
  }

  // When the room program is over, and it's not in boost or holiday mode, it's 'off'
  if (
    !room.hasActiveProgram &&
    room.mode !== DeviceConstants.Status.BOOST &&
    room.mode !== DeviceConstants.Status.HOLIDAY)
  {
    return 'off';
  }

  const modes = [
    [DeviceConstants.Status.AUTO, 'auto'],
    [DeviceConstants.Status.MANUAL, 'manual'],
    [DeviceConstants.Status.HOLIDAY, 'holiday'],
    [DeviceConstants.Status.BOOST, 'boost'],
  ];

  return modes[room.mode][1];
};

const getIcon = (room) =>
{
  const tests = [
    ['office', 'flaticon-office'],
    ['stairs', 'flaticon-stairs'],
    ['bedroom', 'flaticon-bedroom'],
    ['living', 'flaticon-livingroom'],
    ['kitchen', 'flaticon-kitchen'],
    ['sewing', 'flaticon-sewing'],
  ];

  for (let i = 0; i < tests.length; i += 1)
  {
    const test = tests[i];
    const regexp = new RegExp(test[0], 'i');

    if (room.name.match(regexp))
    {
      return test[1];
    }
  }

  return null;
};

const getStatusIcon = (room) =>
{
  if (room.hasErrors)
  {
    return <span className="fa fa-fw fa-warning" />;
  }
  else if (room.radiatorsOn)
  {
    return <span className="fa fa-fw fa-fire" />;
  }

  return null;
};

const RoomTile = ({ room, displayWide }) =>
{
  const iconClass = new ClassBuilder();
  iconClass.useIcon();
  iconClass.iconName = getIcon(room);

  const tileClass = new ClassBuilder();
  tileClass.tile = displayWide ? 'tile-wide' : 'tile';
  tileClass.color = 'fg-white';
  tileClass.useTextShadow();
  tileClass.background = getBackgroundColour(room);

  return (
    <Link to={`/heating/${room.id}`}>
      <div className={tileClass}>
        <div className="tile-content iconic">
          <span className={iconClass} />
          <span className="tile-label">{room.name}</span>
          <span className="tile-badge">{room.actualTemperature ? `${room.actualTemperature}°C` : null}</span>
          <span className="tile-badge top left">{getMode(room)}</span>
          <span className="tile-badge top right">{getStatusIcon(room)}</span>
        </div>
      </div>
    </Link>
  );
};

RoomTile.propTypes = {
  room: React.PropTypes.instanceOf(Room).isRequired,
  displayWide: React.PropTypes.bool,
};

export default observer(RoomTile);
