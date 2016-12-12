import React from 'react';

const DeviceTile = ({ label }) => (
    <div className="tile">
        <div className="tile-content">
            <span className="tile-label">{label}</span>
        </div>
    </div>
);

DeviceTile.propTypes = {
    label: React.PropTypes.string.isRequired,
};

export default DeviceTile;
