import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

import DeviceConstants from '../../constants/device';
import ClassBuilder from '../../utils/class-builder';
import Room from '../../house/room';

const RoomTile = ({ room, displayWide }) => {
    const iconClass = new ClassBuilder();
    iconClass.useIcon();
    if (room.name.match(/office/i)) {
        iconClass.iconName = 'flaticon-office';
    }
    else if (room.name.match(/stairs/i)) {
        iconClass.iconName = 'flaticon-stairs';
    }
    else if (room.name.match(/bed/i)) {
        iconClass.iconName = 'flaticon-bedroom';
    }
    else if (room.name.match(/living/i)) {
        iconClass.iconName = 'flaticon-livingroom';
    }
    else if (room.name.match(/kitchen/i)) {
        iconClass.iconName = 'flaticon-kitchen';
    }
    else if (room.name.match(/sewing/i)) {
        iconClass.iconName = 'flaticon-sewing';
    }

    const tileClass = new ClassBuilder();
    tileClass.tile = displayWide ? 'tile-wide' : 'tile';
    tileClass.color = 'fg-white';
    tileClass.useTextShadow();

    // Decide what colour the tile should be
    if (room.radiatorsOn && room.isCold) {
        tileClass.background = 'bg-lighterBlue';
    }
    else if (room.setPoint > 10) {
        tileClass.background = 'bg-amber';
    }
    else {
        tileClass.background = 'bg-grayLight';
    }

    let mode;
    switch (room.mode) {
        case DeviceConstants.Status.AUTO:
            mode = 'auto';
            break;
        case DeviceConstants.Status.MANUAL:
            mode = 'manual';
            break;
        case DeviceConstants.Status.HOLIDAY:
            mode = 'holiday';
            break;
        case DeviceConstants.Status.BOOST:
            mode = 'boost';
            break;
        default:
            break;
    }

    if (
        room.setPoint <= 10 &&
        room.mode !== DeviceConstants.Status.BOOST &&
        room.mode !== DeviceConstants.Status.HOLIDAY) {
        mode = 'off';
    }

    // If any device in the room is reporting errors, change the colour and show an icon
    let statusIcon;
    for (let i = 0; i < room.devices.length; i += 1) {
        const device = room.devices[i];
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

    return (
        <Link to={`/heating/${room.id}`}>
            <div className={tileClass}>
                <div className="tile-content iconic">
                    <span className={iconClass} />
                    <span className="tile-label">{room.name}</span>
                    <span className="tile-badge">{room.actualTemperature ? `${room.actualTemperature}°C` : null}</span>
                    <span className="tile-badge top left">{mode}</span>
                    {statusIcon}
                </div>
            </div>
        </Link>
    );
};

RoomTile.propTypes = {
    room: React.PropTypes.instanceOf(Room),
    displayWide: React.PropTypes.bool,
};

export default observer(RoomTile);
