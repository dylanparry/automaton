import React from 'react';

import BackButton from '../../components/buttons/back-button';
import HourList from '../../components/weather/hour-list';

export default () => (
  <div>
    <div className="margin20">
      <BackButton to="/weather">Weather Summary</BackButton>

      <h1>24 Hour Forecast</h1>
    </div>
    <HourList />
  </div>
);
