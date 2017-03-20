import React, { Component } from 'react';
import { inject, observer, observableArray } from 'mobx-react';

import BackButton from '../../components/buttons/back-button';
import RoomTile from '../../components/heating/room-tile';
import DeviceTile from '../../components/heating/device-tile';

import WallMountedThermostat from '../../devices/wall-mounted-thermostat';
import RadiatorThermostat from '../../devices/radiator-thermostat';

import TemperatureChart from '../../components/chart/temperature-chart';

const style = {
  chart: {
    marginTop: 15,
  },
};

class Room extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      temperatureData: [],
    };
  }

  componentDidMount()
  {
    // Now get the data for the room
    const query = this.props.heatingStore.database.transaction(['rooms'], 'readonly')
      .objectStore('rooms')
      .index('roomId')
      .getAll(parseInt(this.props.match.params.roomId, 10));

    query.onsuccess = (result) =>
    {
      this.setState({
        temperatureData: result.target.result,
      });
    };
  }

  render()
  {
    // Get the room specified by the URL params
    const room = this.props.heatingStore.rooms.find(
      r => r.id === parseInt(this.props.match.params.roomId, 10),
    );

    // Return a null component if no room found
    if (typeof room === 'undefined')
    {
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

    /*
    The width of the device area is the number of devices × their width (inc margins), plus
    the width of the room tile (wide tile)
    */
    const deviceAreaWidth = (room.devices.length * 160) + 310;

    return (
      <div>
        <div className="margin20">
          <BackButton to="/heating">Heating Summary</BackButton>

          <h1>{room.name}</h1>
        </div>

        <div className="tile-container devices">
          <div style={{ width: deviceAreaWidth, minWidth: 800 }}>
            <RoomTile room={room} displayWide />

            {thermostat}
            {radiators}
          </div>
        </div>

        <div style={style.chart}>
          {
            this.state.temperatureData &&
            <TemperatureChart
              data={this.state.temperatureData}
              currentTemperature={room.actualTemperature || 0} />
          }
        </div>
      </div >
    );
  }
}

Room.propTypes = {
  heatingStore: React.PropTypes.shape({
    rooms: observableArray,
    database: React.PropTypes.object,
  }).isRequired,
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      roomId: React.PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default inject('heatingStore')(observer(Room));
