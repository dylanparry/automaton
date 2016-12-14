import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

import ClassBuilder from '../../utils/class-builder';
import Room from '../../house/room';

const RoomTile = ({ room, displayWide = false }) => {
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

    // This needs a bit of work.
    // If the room is cold, and the heat is on, show it as blue.
    // If the room is warm, and the heat is on (ie. boost), show is as amber
    // If the room program is over, show it as grey
    if (room.radiatorsOn && room.isCold) {
        tileClass.background = 'bg-lighterBlue';
    }
    else if (room.setPoint > 10) {
        tileClass.background = 'bg-amber';
    }
    else {
        tileClass.background = 'bg-grayLight';
    }

    return (
        <Link to={`/heating/${room.id}`}>
            <div className={tileClass}>
                <div className="tile-content iconic">
                    <span className={iconClass} />
                    <span className="tile-label">{room.name}</span>
                    <span className="tile-badge">{room.actualTemperature ? `${room.actualTemperature}°C` : null}</span>
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
