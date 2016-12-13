import React from 'react';

import ClassBuilder from '../../utils/class-builder';

const DeviceTile = ({ label }) => {
    const tileClass = new ClassBuilder();
    tileClass.tile = 'tile';
    tileClass.background = 'bg-steel';
    tileClass.color = 'fg-white';
    tileClass.useTextShadow();

    return (
        <div className={tileClass}>
            <div className="tile-content">
                <span className="tile-label">{label}</span>
            </div>
        </div>
    );
};

DeviceTile.propTypes = {
    label: React.PropTypes.string.isRequired,
};

export default DeviceTile;
