import React from 'react';
import { inject, observer, observableArray } from 'mobx-react';

import BackButton from '../../components/buttons/back-button';
import HeatingTile from '../../components/heating';
import RoomTile from '../../components/heating/room-tile';

const HeatingIndex = ({ heatingStore }) => {
    const rooms = heatingStore.rooms.map(room => (
        <RoomTile key={room.id} room={room} />
    ));

    return (
        <div>
            <div className="margin20">
                <BackButton to="/">Home</BackButton>

                <h1>Heating Summary</h1>
            </div>

            <div className="tile-container">
                <HeatingTile />

                {rooms}
            </div>
        </div>
    );
};

HeatingIndex.propTypes = {
    heatingStore: React.PropTypes.shape({
        rooms: observableArray,
    }),
};

export default inject('heatingStore')(observer(HeatingIndex));
