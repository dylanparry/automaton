import React from 'react';
import { Link } from 'react-router';

import ClassList from '../../utils/class-list';

const HeatingTile = () => {
    const tileClassList = new ClassList();
    tileClassList.tile = 'tile-wide';
    tileClassList.background = 'bg-steel';
    tileClassList.color = 'fg-white';
    tileClassList.useTextShadow();

    return (
        <Link to="/heating">
            <div className={tileClassList}>
                <div className="tile-content iconic">
                    <span className="icon flaticon-thermostat" />
                    <span className="tile-label">Central Heating</span>
                </div>
            </div>
        </Link>
    );
};

export default HeatingTile;
