import React from 'react';

import BackButton from '../../components/buttons/back-button';
import RoomTile from '../../components/heating/room-tile';
import DeviceTile from '../../components/heating/device-tile';

export default () => (
    <div>
        <div className="margin20">
            <BackButton to="/heating">Heating Summary</BackButton>

            <h1>Example Room</h1>
        </div>

        <div className="tile-container">
            <RoomTile id={1} label="Room 1" displayWide />

            <DeviceTile label="Device 1" />
            <DeviceTile label="Device 2" />
            <DeviceTile label="Device 3" />
        </div>
    </div>
);
