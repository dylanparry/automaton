import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Store from './store';

import App from './components/app';
import Home from './components/home';
import Heating from './components/heating';
import Room from './components/heating/room';
import Weather from './components/weather';
import Settings from './components/settings';

// Store the rooms and devices here
const store = new Store();
window.store = store;

// Render the React application for a pretty UI :)
ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />

                <Route path="/heating" component={Heating} />
                <Route path="/heating/:roomId" component={Room} />

                <Route path="/weather" component={Weather} />

                <Route path="/settings" component={Settings} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
