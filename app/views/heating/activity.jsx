import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import BackButton from '../../components/buttons/back-button';
import ThermostatActivityChart from '../../components/chart/thermostat-activity-chart';

class HeatingActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thermostatData: [],
    };
  }

  componentWillMount() {
    // Delete any data older than 24 hours
    const deleteStore = this.props.heatingStore.database.transaction(['thermostat'], 'readwrite')
      .objectStore('thermostat');

    const deleteQuery = deleteStore.index('created')
      .openCursor(IDBKeyRange.upperBound(moment().subtract(24, 'h').toDate()));

    deleteQuery.onsuccess = (deleteResults) => {
      const cursor = deleteResults.target.result;

      // Delete the items selected
      if (cursor) {
        deleteStore.delete(cursor.primaryKey);
        cursor.continue();
      }

      // Now get the leftover data
      const selectQuery = this.props.heatingStore.database.transaction(['thermostat'], 'readonly')
        .objectStore('thermostat')
        .getAll();

      selectQuery.onsuccess = (selectResults) => {
        this.setState({
          thermostatData: selectResults.target.result,
        });
      };
    };
  }

  render() {
    return (
      <div>
        <div className="margin20">
          <BackButton to="/heating">Heating Summary</BackButton>

          <h1>Heating Activity Chart</h1>
        </div>

        <ThermostatActivityChart data={this.state.thermostatData} currentStatus={this.props.heatingStore.thermostatIsActive ? 1 : 0} />
      </div>
    );
  }
}

HeatingActivity.propTypes = {
  heatingStore: React.PropTypes.shape({
    database: React.PropTypes.object,
    thermostatIsActive: React.PropTypes.bool,
  }).isRequired,
};

export default inject('heatingStore')(observer(HeatingActivity));
