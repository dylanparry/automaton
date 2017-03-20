import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import AppBar from '../components/navigation/app-bar';
import IdleTimer from '../components/idle-timer';

import HomeIndex from './home';
import HeatingIndex from './heating';
import HeatingActivity from './heating/activity';
import HeatingRoom from './heating/room';
import WeatherIndex from './weather';
import Weather24Hour from './weather/24hour';
import Weather10Day from './weather/10day';
import SettingsIndex from './settings';

const style = {
  container: {
    marginTop: 80,
  },
};

const App = () => (
  <HashRouter>
    <div>
      <AppBar />
      <div style={style.container}>
        <Switch>
          <Route exact path="/" component={HomeIndex} />

          <Route exact path="/heating" component={HeatingIndex} />
          <Route exact path="/heating/activity" component={HeatingActivity} />
          <Route path="/heating/:roomId" component={HeatingRoom} />

          <Route exact path="/weather" component={WeatherIndex} />
          <Route path="/weather/24hour" component={Weather24Hour} />
          <Route path="/weather/10day" component={Weather10Day} />

          <Route path="/settings" component={SettingsIndex} />
        </Switch>
      </div>
      <IdleTimer />
    </div>
  </HashRouter>
);

export default App;
