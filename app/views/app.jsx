import React from 'react';

import AppBar from '../components/navigation/app-bar';
import IdleTimer from '../components/idle-timer';

const App = ({ children }) => (
  <div>
    <AppBar />
    <div style={{ marginTop: 80 }}>
      {children}
    </div>
    <IdleTimer />
  </div>
);

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
