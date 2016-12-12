import React from 'react';
import { Link } from 'react-router';

const HeatingTile = () => (
    <Link to="/heating">
        <div className="tile-wide">
            <div className="tile-content">
                <span className="tile-label">Central Heating</span>
            </div>
        </div>
    </Link>
);

export default HeatingTile;
