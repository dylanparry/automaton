import React from 'react';

import ClassList from '../../utils/class-list';

const DeviceTile = ({ label }) => {
    const tileClassList = new ClassList();
    tileClassList.tile = 'tile';
    tileClassList.background = 'bg-steel';
    tileClassList.color = 'fg-white';
    tileClassList.useTextShadow();

    return (
        <div className={tileClassList}>
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
