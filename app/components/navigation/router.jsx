import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from '../../views/app';

import HomeIndex from '../../views/home';

import HeatingIndex from '../../views/heating';
import HeatingRoom from '../../views/heating/room';

import WeatherIndex from '../../views/weather';
import WeatherToday from '../../views/weather/today';
import WeatherWeek from '../../views/weather/week';

import SettingsIndex from '../../views/settings';

export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={App}> {/* Main app template */}
            <IndexRoute component={HomeIndex} /> {/* Home screen */}

            <Route path="heating">
                <IndexRoute component={HeatingIndex} /> {/* Heating home screen */}
                <Route path=":roomId" component={HeatingRoom} /> {/* Room summary */}
            </Route>

            <Route path="weather">
                <IndexRoute component={WeatherIndex} /> {/* Summary of weather now */}
                <Route path="today" component={WeatherToday} /> {/* Summary of today's weather */}
                <Route path="week" component={WeatherWeek} /> {/* Five day forecast */}
            </Route>

            <Route path="settings">
                <IndexRoute component={SettingsIndex} /> {/* Settings home screen */}
            </Route>
        </Route>
    </Router>
);
