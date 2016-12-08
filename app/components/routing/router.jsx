import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={null}> {/* Main app template */}
            <IndexRoute component={null} /> {/* Home screen */}

            <Route path="heating">
                <IndexRoute component={null} /> {/* Heating home screen */}
                <Route path=":roomId" component={null} /> {/* Room summary */}
            </Route>

            <Route path="weather">
                <IndexRoute component={null} /> {/* Summary of weather now */}
                <Route path="weather/today" component={null} /> {/* Summary of today's weather */}
                <Route path="weather/week" component={null} /> {/* Five day forecast */}
            </Route>

            <Route path="settings">
                <IndexRoute component={null} /> {/* Settings home screen */}
            </Route>
        </Route>
    </Router>
);
