import React from 'react';
import { Link } from 'react-router';
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

        <Link to="/heating/activity">
          <div className="tile bg-teal fg-white text-shadow">
            <div className="tile-content iconic">
              <span className="icon fa fa-bar-chart" />
              <span className="tile-label">Activity Chart</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

HeatingIndex.propTypes = {
  heatingStore: React.PropTypes.shape({
    rooms: observableArray,
  }).isRequired,
};

export default inject('heatingStore')(observer(HeatingIndex));
