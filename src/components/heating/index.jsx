import React from 'react';
import { Link } from 'react-router';
import { observableMap } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Status, Icons } from '../../constants';

const heating = ({ store }) => {
    const rooms = store.rooms.values().map((room) => {
        // Cyan if radiators are on, or amber if room is warm enough
        let className = room.radiatorsAreOn ? 'tile fg-white bg-lighterBlue' : 'tile fg-white bg-amber';

        // Programme for that room has ended, so change class to grey
        if (room.setPoint <= 10) {
            className = 'tile fg-white bg-grayLight';
        }

        // If the room is in BOOST mode, we assume it's warm enough, so colour it amber
        if (room.mode === Status.Mode.BOOST) {
            className = 'tile fg-white bg-amber';
        }

        let errorState = false;

        // Or if there's an error being reported for any device, change to red
        if (room.valid === Status.Valid.INVALID
            || room.error === Status.Error.YES
            || room.battery === Status.Battery.LOW
            || room.linkStatus === Status.LinkStatus.Error) {
            errorState = true;
            className = 'tile fg-white bg-lightRed';
        }

        // The icon to display for the room state
        let stateIcon;
        // Show a snowflake if it's cold
        if (room.radiatorsAreOn) {
            stateIcon = Icons.ThermostatActive;
        }
        // Show a ... if the room is set to boost mode
        if (room.mode === Status.Mode.BOOST) {
            stateIcon = Icons.Boost;
        }
        // Show a warning if the room has a device in an error state
        if (errorState) {
            stateIcon = Icons.Warning;
        }

        let icon = 'icon ';
        if (room.name.match(/office/i)) {
            icon += 'flaticon-office';
        }
        else if (room.name.match(/stairs/i)) {
            icon += 'flaticon-stairs';
        }
        else if (room.name.match(/bed/i)) {
            icon += 'flaticon-bedroom';
        }
        else if (room.name.match(/living/i)) {
            icon += 'flaticon-livingroom';
        }
        else if (room.name.match(/kitchen/i)) {
            icon += 'flaticon-kitchen';
        }
        else if (room.name.match(/sewing/i)) {
            icon += 'flaticon-sewing';
        }

        return (
            <Link to={`/heating/${room.id}`} key={room.id}>
                <div className={className}>
                    <div className="tile-content iconic">
                        <span className={icon} />
                        <span className="tile-label text-shadow">{room.name}</span>
                        <span className="tile-badge text-shadow">{room.actualTemperature > 0 ? `${room.actualTemperature}°C` : ''}</span>
                        <span className="tile-badge top text-shadow"><span className={stateIcon} /></span>
                    </div>
                </div>
            </Link>
        );
    });

    return (
        <div>
            <ul className="breadcrumbs2">
                <li><Link to="/">{Icons.Home}</Link></li>
                <li><Link to="/heating">Heating</Link></li>
            </ul>

            <h2>Heating</h2>

            <div className="tile-container">
                {rooms}
            </div>
        </div>
    );
};

heating.propTypes = {
    store: React.PropTypes.shape({
        rooms: observableMap,
        getTemperatureForRoom: React.PropTypes.func,
        areRadiatorsOnInRoom: React.PropTypes.func,
    }),
};

export default inject('store')(observer(heating));
