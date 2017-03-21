import React from 'react';
import { Link } from 'react-router-dom';

import WeatherTile from '../../components/weather';
import BackButton from '../../components/buttons/back-button';

const style = {
  container: {
    marginTop: 45,
    textAlign: 'center',
  },

  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
};

export default () => (
  <div>
    <div className="margin20">
      <BackButton to="/">Home</BackButton>

      <h1>Weather Summary</h1>
    </div>

    <div className="tile-container">
      <WeatherTile />

      <div className="tile-large bg-white" />

      <Link to="/weather/24hour">
        <div className="tile bg-teal fg-white text-shadow">
          <div className="tile-content">
            <div style={style.container}>
              <span style={style.buttonText}>24hr<br />Forecast</span>
            </div>
          </div>
        </div>
      </Link>

      <Link to="/weather/10day">
        <div className="tile bg-teal fg-white text-shadow">
          <div className="tile-content">
            <div style={style.container}>
              <span style={style.buttonText}>10 day<br />Forecast</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>
);
