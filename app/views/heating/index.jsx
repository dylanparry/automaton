import React from 'react';
import { Link } from 'react-router';

import BackButton from '../../components/buttons/back-button';

export default () => (
    <div>
        <div className="margin20">
            <BackButton to="/">Home</BackButton>

            <h1>Heating Summary</h1>
        </div>

        <div className="tile-container">
            <div className="tile-wide">
                <div className="tile-content">
                    <span className="tile-label">Heating Summary</span>
                </div>
            </div>

            <Link to="/heating/1">
                <div className="tile">
                    <div className="tile-content">
                        <span className="tile-label">Room 1</span>
                    </div>
                </div>
            </Link>

            <Link to="/heating/2">
                <div className="tile">
                    <div className="tile-content">
                        <span className="tile-label">Room 2</span>
                    </div>
                </div>
            </Link>

            <Link to="/heating/3">
                <div className="tile">
                    <div className="tile-content">
                        <span className="tile-label">Room 3</span>
                    </div>
                </div>
            </Link>

            <Link to="/heating/4">
                <div className="tile">
                    <div className="tile-content">
                        <span className="tile-label">Room 4</span>
                    </div>
                </div>
            </Link>

            <Link to="/heating/5">
                <div className="tile">
                    <div className="tile-content">
                        <span className="tile-label">Room 5</span>
                    </div>
                </div>
            </Link>

            <Link to="/heating/6">
                <div className="tile">
                    <div className="tile-content">
                        <span className="tile-label">Room 6</span>
                    </div>
                </div>
            </Link>

            <Link to="/heating/7">
                <div className="tile">
                    <div className="tile-content">
                        <span className="tile-label">Room 7</span>
                    </div>
                </div>
            </Link>
        </div>
    </div>
);
