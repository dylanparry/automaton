import React from 'react';
import { Link } from 'react-router';
import { inject, observer, observableArray } from 'mobx-react';

import ClassBuilder from '../../utils/class-builder';

const HeatingTile = ({ heatingStore }) => {
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
                    <span className="tile-badge">{heatingStore.thermostatShouldBeActive ? 'active' : 'auto'}</span>
                </div>
            </div>
        </Link>
    );
};

HeatingTile.propTypes = {
    heatingStore: React.PropTypes.shape({
        devices: observableArray,
    }),
};

export default inject('heatingStore')(observer(HeatingTile));
