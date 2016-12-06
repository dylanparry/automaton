import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { inject, observer } from 'mobx-react';
import { hashHistory, Link } from 'react-router';

import { Icons } from '../../constants';
import Power from '../../utils/power';

@inject('store')
@observer
export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.exitApp = this.exitApp.bind(this);
        this.restartApp = this.restartApp.bind(this);
        this.shutdownPi = this.shutdownPi.bind(this);
        this.restartPi = this.restartPi.bind(this);
        this.reconnectCube = this.reconnectCube.bind(this);
        this.disconnectCube = this.disconnectCube.bind(this);
    }

    exitApp() {
        ipcRenderer.send('close');
    }

    restartApp() {
        ipcRenderer.send('restart');
    }

    shutdownPi() {
        Power.shutdown();
    }

    restartPi() {
        Power.reboot();
    }

    reconnectCube() {
        this.props.store.connectCube();
        hashHistory.push('/');
    }

    disconnectCube() {
        this.props.store.disconnectCube();
        hashHistory.push('/');
    }

    render() {
        return (
            <div>
                <ul className="breadcrumbs2">
                    <li><Link to="/">{Icons.Home}</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>

                <h2>Settings</h2>

                <div className="tile-container">
                    <a tabIndex="0" onClick={this.exitApp}>
                        <div className="tile fg-white bg-steel">
                            <div className="tile-content iconic">
                                <span className="icon fa fa-window-close" />
                                <span className="tile-label text-shadow">Close Automaton</span>
                            </div>
                        </div>
                    </a>

                    <a tabIndex="0" onClick={this.restartApp}>
                        <div className="tile fg-white bg-steel">
                            <div className="tile-content iconic">
                                <span className="icon fa fa-repeat" />
                                <span className="tile-label text-shadow">Restart Automaton</span>
                            </div>
                        </div>
                    </a>

                    <a tabIndex="0" onClick={this.shutdownPi}>
                        <div className="tile fg-white bg-steel">
                            <div className="tile-content iconic">
                                <span className="icon fa fa-power-off" />
                                <span className="tile-label text-shadow">Power Off</span>
                            </div>
                        </div>
                    </a>

                    <a tabIndex="0" onClick={this.restartPi}>
                        <div className="tile fg-white bg-steel">
                            <div className="tile-content iconic">
                                <span className="icon fa fa-refresh" />
                                <span className="tile-label text-shadow">Reboot</span>
                            </div>
                        </div>
                    </a>

                    <a tabIndex="0" onClick={this.reconnectCube}>
                        <div className="tile fg-white bg-steel">
                            <div className="tile-content iconic">
                                <span className="icon fa fa-link" />
                                <span className="tile-label text-shadow">Reconnect Cube</span>
                            </div>
                        </div>
                    </a>

                    <a tabIndex="0" onClick={this.disconnectCube}>
                        <div className="tile fg-white bg-steel">
                            <div className="tile-content iconic">
                                <span className="icon fa fa-unlink" />
                                <span className="tile-label text-shadow">Disconnect Cube</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    store: React.PropTypes.shape({
        disconnectCube: React.PropTypes.func,
        connectCube: React.PropTypes.func,
    }),
};
