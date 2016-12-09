import React from 'react';
import { Link } from 'react-router';

export default () => (
    <div className="app-bar navy" style={{ position: 'fixed', top: 0, left: 0, zIndex: 2 }}>
        <Link to="/" className="app-bar-element"><span className="icon fa fa-fw fa-cogs" /> automaton</Link>
        <span className="app-bar-divider" />
        <ul className="app-bar-menu">
            <li>
                <a className="dropdown-toggle"><span className="icon fa fa-fw fa-thermometer" /> Heating</a>
                <ul className="d-menu" data-role="dropdown">
                    <li><Link to="/heating">Heating Summary</Link></li>
                    <li><Link to="/heating/1">Heating Room Summary</Link></li>
                </ul>
            </li>
            <li>
                <a className="dropdown-toggle"><span className="icon fa fa-fw fa-cloud" /> Weather</a>
                <ul className="d-menu" data-role="dropdown">
                    <li><Link to="/weather">Weather Summary</Link></li>
                    <li><Link to="/weather/today">Weather Today</Link></li>
                    <li><Link to="/weather/week">Weather Week</Link></li>
                </ul>
            </li>
            <li><Link to="/settings"><span className="icon fa fa-fw fa-cog" /> Settings</Link></li>
        </ul>
    </div>
);
