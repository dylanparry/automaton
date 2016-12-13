import React from 'react';
import { Link } from 'react-router';

import ClassBuilder from '../../utils/class-builder';

const HeatingTile = () => {
    const tileClass = new ClassBuilder();
    tileClass.tile = 'tile-wide';
    tileClass.background = 'bg-steel';
    tileClass.color = 'fg-white';
    tileClass.useTextShadow();

    return (
        <Link to="/heating">
            <div className={tileClass}>
                <div className="tile-content iconic">
                    <span className="icon flaticon-thermostat" />
                    <span className="tile-label">Central Heating</span>
                </div>
            </div>
        </Link>
    );
};

export default HeatingTile;
