import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';

import { Status, Icons } from '../../constants';

const Widget = ({ store }) => {
    if (store.rooms.size === 0) {
        return (
            <div className="tile fg-white bg-lightRed">
                <div className="tile-content iconic">
                    <span className="icon flaticon-thermostat" />
                    <span className="tile-label text-shadow">Heating</span>
                    <span className="tile-badge text-shadow">ERROR</span>
                    <span className="tile-badge top text-shadow">{Icons.LinkStatusError}</span>
                </div>
            </div>
        );
    }

    const rooms = store.rooms.values();

    const label = store.thermostatIsActive ? 'ACTIVE' : 'AUTO';
    let className = store.thermostatIsActive
        ? 'tile fg-white bg-lighterBlue'
        : 'tile fg-white bg-amber';

    const allProgrammesEnded = [];

    // Loop through the rooms to see if the heating programme is still ACTIVE
    for (let i = 0; i < rooms.length; i += 1) {
        // When 10°C or lower, the programme has ended
        allProgrammesEnded.push(rooms[i].setPoint <= 10);
    }

    if (allProgrammesEnded.every(value => value === true)) {
        className = 'tile fg-white bg-steel';
    }

    let errorState = false;

    // Loop through all the rooms to see if there were any errors
    for (let i = 0; i < rooms.length; i += 1) {
        const room = rooms[i];

        // If any errors are found, change the tile to red and end the loop
        if (room.valid === Status.Valid.INVALID
            || room.error === Status.Error.YES
            || room.battery === Status.Battery.LOW
            || room.linkStatus === Status.LinkStatus.Error) {
            errorState = true;
            className = 'tile fg-white bg-lightRed';
            break;
        }
    }

    return (
        <Link to="/heating">
            <div className={className}>
                <div className="tile-content iconic">
                    <span className="icon flaticon-thermostat" />
                    <span className="tile-label text-shadow">Heating</span>
                    <span className="tile-badge text-shadow">{label}</span>
                    <span className="tile-badge top text-shadow">{errorState ? Icons.Warning : null}</span>
                </div>
            </div>
        </Link>
    );
};

Widget.propTypes = {
    store: React.PropTypes.shape({
        thermostatIsActive: React.PropTypes.bool,
        rooms: React.PropTypes.object,
    }),
};

export default inject('store')(observer(Widget));
