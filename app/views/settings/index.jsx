import React from 'react';
import { ipcRenderer } from 'electron';

import BackButton from '../../components/buttons/back-button';
import ActionButton from '../../components/buttons/action-button';
import Power from '../../utils/power';

export default () => (
  <div>
    <div className="margin20">
      <BackButton to="/">Home</BackButton>

      <h1>Settings</h1>

      <div style={{ marginTop: 40 }}>
        <ActionButton title="Quit Automaton" icon="fa fa-window-close" action={() => ipcRenderer.send('quit')} />
        <ActionButton title="Relaunch Automaton" icon="fa fa-repeat" action={() => ipcRenderer.send('relaunch')} />
        <ActionButton title="Power Off" icon="fa fa-power-off" action={() => Power.shutdown()} />
        <ActionButton title="Reboot" icon="fa fa-refresh" action={() => Power.reboot()} />
        <ActionButton title="Reconnect Cube" icon="fa fa-link" action={() => null} />
        <ActionButton title="Disconnect Cube" icon="fa fa-unlink" action={() => null} />
      </div>
    </div>
  </div>
);
