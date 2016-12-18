import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

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
    const query = this.props.heatingStore.database.transaction(['thermostat'], 'readonly')
      .objectStore('thermostat')
      .getAll();

    query.onsuccess = (e) => {
      this.setState({
        thermostatData: e.target.result,
      });
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
  }),
};

export default inject('heatingStore')(observer(HeatingActivity));
