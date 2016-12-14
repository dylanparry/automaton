import React from 'react';
import { inject, observer, observableArray } from 'mobx-react';

import BackButton from '../../components/buttons/back-button';
import RoomTile from '../../components/heating/room-tile';
import DeviceTile from '../../components/heating/device-tile';

import WallMountedThermostat from '../../devices/wall-mounted-thermostat';
import RadiatorThermostat from '../../devices/radiator-thermostat';

const Room = ({ heatingStore, params }) => {
    // Get the room specified by the URL params
    const room = heatingStore.rooms.find(r => r.id === parseInt(params.roomId, 10));

    // Return a null component if no room found
    if (typeof room === 'undefined') {
        return null;
    }

    const thermostat = room.devices.filter(
        device => device instanceof WallMountedThermostat,
    ).map(
        device => <DeviceTile key={device.rfAddress} device={device} />,
    );

    const radiators = room.devices.filter(
        device => device instanceof RadiatorThermostat,
    ).map(
        device => <DeviceTile key={device.rfAddress} device={device} />,
    );

    return (
        <div>
            <div className="margin20">
                <BackButton to="/heating">Heating Summary</BackButton>

                <h1>{room.name}</h1>
            </div>

            <div className="tile-container">
                <RoomTile room={room} displayWide />

                {thermostat}
                {radiators}
            </div>
        </div>
    );
};

Room.propTypes = {
    heatingStore: React.PropTypes.shape({
        rooms: observableArray,
    }),
    params: React.PropTypes.shape({
        roomId: React.PropTypes.string,
    }),
};

export default inject('heatingStore')(observer(Room));
