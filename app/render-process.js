import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { webFrame } from 'electron';

import Router from './components/navigation/router';
import HeatingStore from './stores/heating-store';

// Disable zooming
webFrame.setZoomLevelLimits(1, 1);

// Stores
const heatingStore = new HeatingStore();

// Create a Provider with props for the stores and the Router as a child
const provider = React.createElement(Provider, {
    heatingStore,
}, React.createElement(Router));

ReactDOM.render(provider, document.getElementById('app'));
