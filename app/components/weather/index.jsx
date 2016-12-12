import React from 'react';
import { Link } from 'react-router';

const WeatherTile = () => (
    <Link to="/weather">
        <div className="tile-wide">
            <div className="tile-content">
                <span className="tile-label">Weather</span>
            </div>
        </div>
    </Link>
);

export default WeatherTile;
