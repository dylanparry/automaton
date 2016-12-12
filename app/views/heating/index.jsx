import React from 'react';

import BackButton from '../../components/buttons/back-button';
import HeatingTile from '../../components/heating';
import RoomTile from '../../components/heating/room-tile';

export default () => (
    <div>
        <div className="margin20">
            <BackButton to="/">Home</BackButton>

            <h1>Heating Summary</h1>
        </div>

        <div className="tile-container">
            <HeatingTile />

            <RoomTile id="1" label="Room 1" />
            <RoomTile id="2" label="Room 2" />
            <RoomTile id="3" label="Room 3" />
            <RoomTile id="4" label="Room 4" />
            <RoomTile id="5" label="Room 5" />
            <RoomTile id="6" label="Room 6" />
            <RoomTile id="7" label="Room 7" />
        </div>
    </div>
);
