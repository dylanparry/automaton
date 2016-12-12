import React from 'react';
import { inject, observer, observableMap } from 'mobx-react';

import BackButton from '../../components/buttons/back-button';
import RoomTile from '../../components/heating/room-tile';
import DeviceTile from '../../components/heating/device-tile';

const Room = ({ heatingStore, params }) => {
    // Get the room specified by the URL params
    const room = heatingStore.rooms.values().find(r => r.id === parseInt(params.roomId, 10));

    // Return a null component if no room found
    if (typeof room === 'undefined') {
        return null;
    }

    return (
        <div>
            <div className="margin20">
                <BackButton to="/heating">Heating Summary</BackButton>

                <h1>{room.name}</h1>
            </div>

            <div className="tile-container">
                <RoomTile id={room.id} label={room.name} displayWide />

                <DeviceTile label="Device 1" />
                <DeviceTile label="Device 2" />
                <DeviceTile label="Device 3" />
            </div>
        </div>
    );
};

Room.propTypes = {
    heatingStore: React.PropTypes.shape({
        rooms: observableMap,
    }),
    params: React.PropTypes.shape({
        roomId: React.PropTypes.string,
    }),
};

export default inject('heatingStore')(observer(Room));
