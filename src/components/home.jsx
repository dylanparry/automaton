import React from 'react';

import HeatingWidget from './heating/widget';
import WeatherWidget from './weather/widget';
import ClockWidget from './clock';

export default () => (
    <div className="tile-container">
        <HeatingWidget />
        <WeatherWidget />
        <ClockWidget />
    </div>
);
