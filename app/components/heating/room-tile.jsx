import React from 'react';
import { Link } from 'react-router';

const icons = new Map();
icons.set('office', 'flaticon-office');
icons.set('stairs', 'flaticon-stairs');
icons.set('bedroom', 'flaticon-bedroom');
icons.set('living', 'flaticon-livingroom');
icons.set('kitchen', 'flaticon-kitchen');
icons.set('sewing', 'flaticon-sewing');

const RoomTile = ({ id, label, displayWide = false }) => {
    let icon = 'icon ';
    if (label.match(/office/i)) {
        icon += 'flaticon-office';
    }
    else if (label.match(/stairs/i)) {
        icon += 'flaticon-stairs';
    }
    else if (label.match(/bed/i)) {
        icon += 'flaticon-bedroom';
    }
    else if (label.match(/living/i)) {
        icon += 'flaticon-livingroom';
    }
    else if (label.match(/kitchen/i)) {
        icon += 'flaticon-kitchen';
    }
    else if (label.match(/sewing/i)) {
        icon += 'flaticon-sewing';
    }

    return (
        <Link to={`/heating/${id}`}>
            <div className={displayWide ? 'tile-wide' : 'tile'}>
                <div className="tile-content iconic">
                    <span className={icon} />
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
