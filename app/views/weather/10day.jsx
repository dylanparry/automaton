import React from 'react';

import BackButton from '../../components/buttons/back-button';

export default () => (
  <div>
    <div className="margin20">
      <BackButton to="/weather">Weather Summary</BackButton>

      <h1>10 Day Forecast</h1>
    </div>
  </div>
);
