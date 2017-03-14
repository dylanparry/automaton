import React from 'react';
import { hashHistory } from 'react-router';
import { inject } from 'mobx-react';
import { ipcRenderer } from 'electron';

import BackButton from '../../components/buttons/back-button';
import ActionButton from '../../components/buttons/action-button';
import Power from '../../utils/power';

const style = {
  container: {
    marginTop: 20,
  },
};

const cubeAction = (cb) =>
{
  cb();
  hashHistory.push('/');
};

const Settings = ({ heatingStore }) => (
  <div>
    <div className="margin20">
      <BackButton to="/">Home</BackButton>

      <h1>Settings</h1>

      <div style={style.container}>
        <ActionButton title="Quit Automaton" icon="fa fa-window-close" action={() => ipcRenderer.send('quit')} />
        <ActionButton title="Relaunch Automaton" icon="fa fa-repeat" action={() => ipcRenderer.send('relaunch')} />
        <ActionButton title="Power Off" icon="fa fa-power-off" action={() => Power.shutdown()} />
        <ActionButton title="Reboot" icon="fa fa-refresh" action={() => Power.reboot()} />
        <ActionButton title="Reconnect Cube" icon="fa fa-link" action={() => cubeAction(() => heatingStore.connectToCube())} />
        <ActionButton title="Disconnect Cube" icon="fa fa-unlink" action={() => cubeAction(() => heatingStore.disconnectFromCube())} />
      </div>

      <h4 style={{ marginTop: 20 }}>Environment Variables <button className="button small-button" onClick={() => ipcRenderer.send('showDevTools')}>Dev Tools</button></h4>

      <table className="table striped">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>API Key</strong></td>
            <td>{process.env.WEATHER_DOT_COM_API_KEY}</td>
          </tr>
          <tr>
            <td><strong>Country</strong></td>
            <td>{process.env.WEATHER_DOT_COM_API_COUNTRY}</td>
          </tr>
          <tr>
            <td><strong>Town</strong></td>
            <td>{process.env.WEATHER_DOT_COM_API_TOWN}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

Settings.propTypes = {
  heatingStore: React.PropTypes.shape({
    connectToCube: React.PropTypes.func,
    disconnectFromCube: React.PropTypes.func,
  }).isRequired,
};

export default inject('heatingStore')(Settings);
