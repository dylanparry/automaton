import React from 'react';
import { Link } from 'react-router';

const RoomTile = ({ id, label, displayWide = false }) => (
    <Link to={`/heating/${id}`}>
        <div className={displayWide ? 'tile-wide' : 'tile'}>
            <div className="tile-content">
                <span className="tile-label">{label}</span>
            </div>
        </div>
    </Link>
);

RoomTile.propTypes = {
    id: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired,
    displayWide: React.PropTypes.bool,
};

export default RoomTile;
