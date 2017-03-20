import React from 'react';

import WeatherTile from '../../components/weather';
import BackButton from '../../components/buttons/back-button';

export default () => (
  <div>
    <div className="margin20">
      <BackButton to="/">Home</BackButton>

      <h1>Weather Summary</h1>
    </div>

    <div className="tile-container">
      <WeatherTile />
    </div>
  </div>
);
