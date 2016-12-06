import React from 'react';
import { useStrict } from 'mobx';

import { Icons } from '../constants';
import IdleTimer from './idle-timer';
import NavLink from './nav-link';

useStrict(true);

const App = ({ children }) => (
    <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, overflow: 'hidden' }}>
        <IdleTimer />

        <section className="app-bar">
            <a href="" className="app-bar-element"><span className="fa fa-cogs" /> automaton</a>
        </section>

        <main className="grid">
            <div className="row cells6">
                <section className="cell">
                    <ul className="sidebar2">
                        <NavLink to="/heating">
                            {Icons.Heating}
                            Heating
                        </NavLink>
                        <NavLink to="/weather">
                            {Icons.Weather}
                            Weather
                        </NavLink>
                        <NavLink to="/settings">
                            {Icons.Settings}
                            Settings
                        </NavLink>
                    </ul>
                </section>

                <section className="cell colspan5">
                    {children}
                </section>
            </div>
        </main>
    </div >
);

App.propTypes = {
    children: React.PropTypes.element,
};

export default App;
