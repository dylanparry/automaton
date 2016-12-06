import React from 'react';
import { Link } from 'react-router';
import { observableMap } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Status, Icons } from '../../constants';

import RadiatorThermostat from '../../devices/radiator-thermostat';
import WallMountedThermostat from '../../devices/wall-mounted-thermostat';

const Room = ({ store, params }) => {
    const room = store.rooms.values().find(i => i.id === parseInt(params.roomId, 10));

    // Don't display anything if the room is undefined or has no devices
    if (typeof room === 'undefined' || room.devices.size === 0) {
        return null;
    }

    const wallMountedThermostat = room.devices.values().find(
        device => device instanceof WallMountedThermostat,
    );

    const radiatorThermostats = room.devices.values().filter(
        device => device instanceof RadiatorThermostat,
    );

    const devices = [];

    if (typeof wallMountedThermostat !== 'undefined') {
        const className = wallMountedThermostat.valid === Status.Valid.INVALID
            || wallMountedThermostat.error === Status.Error.YES
            || wallMountedThermostat.battery === Status.Battery.LOW
            || wallMountedThermostat.linkStatus === Status.LinkStatus.ERROR
            ? 'tile fg-white bg-lightRed' : 'tile fg-white bg-lime';

        const statusIcon = (
            <span>
                {
                    wallMountedThermostat.error === Status.Error.YES
                        ? Icons.Warning
                        : null
                }
                {
                    wallMountedThermostat.valid === Status.Valid.INVALID
                        ? Icons.Invalid
                        : null
                }
                {
                    wallMountedThermostat.battery === Status.Battery.LOW
                        ? Icons.LowBattery
                        : null
                }
                {
                    wallMountedThermostat.linkStatus === Status.LinkStatus.ERROR
                        ? Icons.LinkStatusError
                        : null
                }
            </span>
        );

        devices.push(
            <div className={className} key={wallMountedThermostat.rfAddress}>
                <div className="tile-content iconic">
                    <span className="icon flaticon-thermostat" />
                    <span className="tile-label text-shadow">Thermostat</span>
                    <span className="tile-badge text-shadow">{wallMountedThermostat.actualTemperature}°C</span>
                    <span className="tile-badge top text-shadow">{statusIcon}</span>
                </div>
            </div>,
        );
    }

    for (let i = 0; i < radiatorThermostats.length; i += 1) {
        const radiator = radiatorThermostats[i];

        const className = radiator.valid === Status.Valid.INVALID
            || radiator.error === Status.Error.YES
            || radiator.battery === Status.Battery.LOW
            || radiator.linkStatus === Status.LinkStatus.ERROR
            ? 'tile fg-white bg-lightRed'
            : 'tile fg-white bg-lime';

        const statusIcon = (
            <span>
                {radiator.valid === Status.Valid.INVALID ? Icons.Invalid : null}
                {radiator.error === Status.Error.YES ? Icons.Warning : null}
                {radiator.battery === Status.Battery.LOW ? Icons.LowBattery : null}
                {radiator.linkStatus === Status.LinkStatus.ERROR ? Icons.LinkStatusError : null}
            </span>
        );

        devices.push(
            <div className={className} key={radiator.rfAddress}>
                <div className="tile-content iconic">
                    <span className="icon flaticon-radiator" />
                    <span className="tile-label text-shadow">{radiator.deviceName}</span>
                    <span className="tile-badge text-shadow">{radiator.valvePosition}%</span>
                    <span className="tile-badge top text-shadow">{statusIcon}</span>
                </div>
            </div>,
        );
    }

    return (
        <div>
            <ul className="breadcrumbs2">
                <li><Link to="/">{Icons.Home}</Link></li>
                <li><Link to="/heating">Heating</Link></li>
                <li><Link to={`/heating/${room.id}`}>{room.name}</Link></li>
            </ul>

            <h2>{room.name}</h2>

            <div className="tile-container">
                {devices}
            </div>
        </div>
    );
};

Room.propTypes = {
    store: React.PropTypes.shape({
        rooms: observableMap,
    }),
    params: React.PropTypes.shape({
        roomId: React.PropTypes.string,
    }),
};

export default inject('store')(observer(Room));
