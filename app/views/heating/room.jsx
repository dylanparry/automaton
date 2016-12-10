import React from 'react';

export default () => (
    <div>
        <h1>Example Room</h1>

        <div className="tile-container">
            <div className="tile-wide">
                <div className="tile-content">
                    <span className="tile-label">Room Summary</span>
                </div>
            </div>

            <div className="tile">
                <div className="tile-content">
                    <span className="tile-label">Device 1</span>
                </div>
            </div>

            <div className="tile">
                <div className="tile-content">
                    <span className="tile-label">Device 2</span>
                </div>
            </div>

            <div className="tile">
                <div className="tile-content">
                    <span className="tile-label">Device 3</span>
                </div>
            </div>
        </div>
    </div>
);
