import React from 'react';

import AppBar from '../components/navigation/app-bar';

const App = ({ children }) => (
    <div>
        <AppBar />
        <div style={{ marginTop: 80 }}>
            {children}
        </div>
    </div>
);

App.propTypes = {
    children: React.PropTypes.node.isRequired,
};

export default App;
