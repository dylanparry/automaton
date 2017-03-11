import React from 'react';

import HeatingTile from '../../components/heating';
import WeatherTile from '../../components/weather';
import CalendarTile from '../../components/calendar';
import ClockTile from '../../components/clock';

export default () => (
  <div>
    <div className="margin20">
      <h1>Home</h1>
    </div>

    <div className="tile-container">
      <HeatingTile />
      <WeatherTile />
      <CalendarTile />
      <ClockTile />
    </div>
  </div>
);
