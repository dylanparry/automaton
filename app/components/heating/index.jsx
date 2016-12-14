import React from 'react';
import { Link } from 'react-router';
import { inject, observer, observableArray } from 'mobx-react';

import ClassBuilder from '../../utils/class-builder';

const HeatingTile = ({ heatingStore }) => {
    const tileClass = new ClassBuilder();
    tileClass.tile = 'tile-wide';
    tileClass.color = 'fg-white';
    tileClass.useTextShadow();

    // Work out background colour
    if (heatingStore.thermostatShouldBeActive) {
        // The thermostat should be active
        tileClass.background = 'bg-lighterBlue';
    }
    else if (!heatingStore.thermostatShouldBeActive && heatingStore.programsAreActive) {
        // The thermostat should not be active, but there are active programs
        tileClass.background = 'bg-amber';
    }
    else {
        // There are no active programs, and the thermostat isn't active
        tileClass.background = 'bg-grayLight';
    }

    let mode = heatingStore.thermostatShouldBeActive ? 'active' : 'auto';
    if (!heatingStore.thermostatShouldBeActive && !heatingStore.programsAreActive) {
        mode = 'off';
    }

    return (
        <Link to="/heating">
            <div className={tileClass}>
                <div className="tile-content iconic">
                    <span className="icon flaticon-thermostat" />
                    <span className="tile-label">Central Heating</span>
                    <span className="tile-badge top left">{mode}</span>
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
