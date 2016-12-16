import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { webFrame } from 'electron';

import Router from './components/navigation/router';
import HeatingStore from './stores/heating-store';

// Disable zooming
webFrame.setZoomLevelLimits(1, 1);

const connection = window.indexedDB.open('automaton', 1);

connection.onupgradeneeded = ({ target: { result } }) => {
    const database = result;

    // Create a table for rooms
    if (!database.objectStoreNames.contains('rooms')) {
        database.createObjectStore('rooms');
    }

    // Create a table for thermostat
    if (!database.objectStoreNames.contains('thermostat')) {
        database.createObjectStore('thermostat');
    }
};

connection.onsuccess = ({ target: { result } }) => {
    // Stores
    const heatingStore = new HeatingStore();
    const stores = window.stores = {
        heatingStore,
        database: result,
    };

    // Create a Provider with props for the stores and the Router as a child
    const provider = React.createElement(Provider, stores, React.createElement(Router));

    ReactDOM.render(provider, document.getElementById('app'));
};
