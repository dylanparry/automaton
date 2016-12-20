import React from 'react';

import AppBar from '../components/navigation/app-bar';
import IdleTimer from '../components/idle-timer';

const style = {
  container: {
    marginTop: 80,
  },
};

const App = ({ children }) => (
  <div>
    <AppBar />
    <div style={style.container}>
      {children}
    </div>
    <IdleTimer />
  </div>
);

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
