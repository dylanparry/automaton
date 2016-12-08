import React from 'react';
import { Link } from 'react-router';

const App = ({ children }) => (
    <div>
        <div>
            <ul className="sidebar2">
                <li><Link to="/"><span className="icon fa fa-fw fa-home" /> Home</Link></li>
                <li>
                    <a className="dropdown-toggle"><span className="icon fa fa-fw fa-thermometer" /> Heating</a>
                    <ul className="d-menu" data-role="dropdown">
                        <li><Link to="/heating">Heating Summary</Link></li>
                        <li><Link to="/heating/1">Heating Room Summary</Link></li>
                    </ul>
                </li>
                <li>
                    <a className="dropdown-toggle"><span className="icon fa fa-fw fa-sun-o" /> Weather</a>
                    <ul className="d-menu" data-role="dropdown">
                        <li><Link to="/weather">Weather Summary</Link></li>
                        <li><Link to="/weather/today">Weather Today</Link></li>
                        <li><Link to="/weather/week">Weather Week</Link></li>
                    </ul>
                </li>
                <li><Link to="/settings"><span className="icon fa fa-fw fa-cog" /> Settings</Link></li>
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
