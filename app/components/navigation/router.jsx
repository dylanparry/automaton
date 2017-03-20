import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from '../../views/app';

import HomeIndex from '../../views/home';

import HeatingIndex from '../../views/heating';
import HeatingRoom from '../../views/heating/room';
import HeatingActivity from '../../views/heating/activity';

import WeatherIndex from '../../views/weather';
import Weather24Hour from '../../views/weather/24hour';
import Weather10Day from '../../views/weather/10day';

import SettingsIndex from '../../views/settings';

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}> {/* Main app template */}
      <IndexRoute component={HomeIndex} /> {/* Home screen */}

      <Route path="heating">
        <IndexRoute component={HeatingIndex} /> {/* Heating home screen */}
        <Route path="activity" component={HeatingActivity} /> {/* Heating activity charts */}
        <Route path=":roomId" component={HeatingRoom} /> {/* Room summary */}
      </Route>

      <Route path="weather">
        <IndexRoute component={WeatherIndex} /> {/* Summary of weather now */}
        <Route path="24hour" component={Weather24Hour} /> {/* 24 hour forecast */}
        <Route path="10day" component={Weather10Day} /> {/* 10 day forecast */}
      </Route>

      <Route path="settings">
        <IndexRoute component={SettingsIndex} /> {/* Settings home screen */}
      </Route>
    </Route>
  </Router>
);
