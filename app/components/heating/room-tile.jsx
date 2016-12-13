import React from 'react';
import { Link } from 'react-router';

import ClassBuilder from '../../utils/class-builder';

const RoomTile = ({ id, label, displayWide = false }) => {
    const iconClass = new ClassBuilder();
    iconClass.useIcon();
    if (label.match(/office/i)) {
        iconClass.iconName = 'flaticon-office';
    }
    else if (label.match(/stairs/i)) {
        iconClass.iconName = 'flaticon-stairs';
    }
    else if (label.match(/bed/i)) {
        iconClass.iconName = 'flaticon-bedroom';
    }
    else if (label.match(/living/i)) {
        iconClass.iconName = 'flaticon-livingroom';
    }
    else if (label.match(/kitchen/i)) {
        iconClass.iconName = 'flaticon-kitchen';
    }
    else if (label.match(/sewing/i)) {
        iconClass.iconName = 'flaticon-sewing';
    }

    const tileClass = new ClassBuilder();
    tileClass.tile = displayWide ? 'tile-wide' : 'tile';
    tileClass.background = 'bg-steel';
    tileClass.color = 'fg-white';
    tileClass.useTextShadow();

    return (
        <Link to={`/heating/${id}`}>
            <div className={tileClass}>
                <div className="tile-content iconic">
                    <span className={iconClass} />
                    <span className="tile-label">{label}</span>
                </div>
            </div>
        </Link>
    );
};

RoomTile.propTypes = {
    id: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired,
    displayWide: React.PropTypes.bool,
};

export default RoomTile;
