import React from 'react';
import { Link } from 'react-router';

export default () => (
    <div>
        <div className="margin20">
            <h1>Home</h1>
        </div>

        <div className="tile-container">
            <Link to="/heating">
                <div className="tile-wide">
                    <div className="tile-content">
                        <span className="tile-label">Central Heating</span>
                    </div>
                </div>
            </Link>

            <Link to="/weather">
                <div className="tile-wide">
                    <div className="tile-content">
                        <span className="tile-label">Weather</span>
                    </div>
                </div>
            </Link>

            <div className="tile">
                <div className="tile-content">
                    <span className="tile-label">Calendar</span>
                </div>
            </div>
        </div>
    </div>
);
