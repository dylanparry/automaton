import React from 'react';
import { Link } from 'react-router';

const App = ({ children }) => (
    <div>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/heating">Heating Summary</Link></li>
                <li><Link to="/heating/1">Heating Room Summary</Link></li>
                <li><Link to="/weather">Weather Summary</Link></li>
                <li><Link to="/weather/today">Weather Today</Link></li>
                <li><Link to="/weather/week">Weather Week</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
        <div>
            {children}
        </div>
    </div>
);

App.propTypes = {
    children: React.PropTypes.node.isRequired,
};

export default App;
