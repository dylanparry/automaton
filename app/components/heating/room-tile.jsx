import React from 'react';
import { Link } from 'react-router';

import ClassList from '../../utils/class-list';

const RoomTile = ({ id, label, displayWide = false }) => {
    const iconClassList = new ClassList();
    iconClassList.useIcon();
    if (label.match(/office/i)) {
        iconClassList.iconName = 'flaticon-office';
    }
    else if (label.match(/stairs/i)) {
        iconClassList.iconName = 'flaticon-stairs';
    }
    else if (label.match(/bed/i)) {
        iconClassList.iconName = 'flaticon-bedroom';
    }
    else if (label.match(/living/i)) {
        iconClassList.iconName = 'flaticon-livingroom';
    }
    else if (label.match(/kitchen/i)) {
        iconClassList.iconName = 'flaticon-kitchen';
    }
    else if (label.match(/sewing/i)) {
        iconClassList.iconName = 'flaticon-sewing';
    }

    const tileClassList = new ClassList();
    tileClassList.tile = displayWide ? 'tile-wide' : 'tile';
    tileClassList.background = 'bg-steel';
    tileClassList.color = 'fg-white';
    tileClassList.useTextShadow();

    return (
        <Link to={`/heating/${id}`}>
            <div className={tileClassList}>
                <div className="tile-content iconic">
                    <span className={iconClassList} />
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
