import React from 'react';
import { Link } from 'react-router';

import ClassList from '../../utils/class-list';

const WeatherTile = () => {
    const tileClassList = new ClassList();
    tileClassList.tile = 'tile-wide';
    tileClassList.background = 'bg-steel';
    tileClassList.color = 'fg-white';
    tileClassList.useTextShadow();

    return (
        <Link to="/weather">
            <div className={tileClassList}>
                <div className="tile-content">
                    <span className="tile-label">Weather</span>
                </div>
            </div>
        </Link>
    );
};

export default WeatherTile;
