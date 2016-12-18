import React, { Component } from 'react';
import { inject, observer, observableArray } from 'mobx-react';

import BackButton from '../../components/buttons/back-button';
import RoomTile from '../../components/heating/room-tile';
import DeviceTile from '../../components/heating/device-tile';

import WallMountedThermostat from '../../devices/wall-mounted-thermostat';
import RadiatorThermostat from '../../devices/radiator-thermostat';

import TemperatureChart from '../../components/chart/temperature-chart';

class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            temperatureData: [],
        };
    }

    componentDidMount() {
        // Update the chart data
        this.updateTemperatureData();
    }

    updateTemperatureData() {
        const query = this.props.heatingStore.database.transaction(['rooms'], 'readonly')
            .objectStore('rooms')
            .index('roomId')
            .getAll(parseInt(this.props.params.roomId, 10));

        query.onsuccess = (e) => {
            this.setState({
                temperatureData: e.target.result,
            });
        };
    }

    render() {
        // Get the room specified by the URL params
        const room = this.props.heatingStore.rooms.find(
            r => r.id === parseInt(this.props.params.roomId, 10),
        );

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
                    <div style={{ width: deviceAreaWidth }}>
                        <RoomTile room={room} displayWide />

                        {thermostat}
                        {radiators}
                    </div>
                </div>

                <div style={{ marginTop: 15 }}>
                    {
                        this.state.temperatureData &&
                        <TemperatureChart data={this.state.temperatureData} currentTemperature={room.actualTemperature} />
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
    }),
    params: React.PropTypes.shape({
        roomId: React.PropTypes.string,
    }),
};

export default inject('heatingStore', 'database')(observer(Room));
