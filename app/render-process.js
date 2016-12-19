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
    const objectStore = database.createObjectStore('rooms', { autoIncrement: true });

    // Add indexes for roomId and created
    objectStore.createIndex('roomId', 'roomId', { unique: false });
    objectStore.createIndex('created', 'created', { unique: false });
  }

  // Create a table for thermostat
  if (!database.objectStoreNames.contains('thermostat')) {
    const objectStore = database.createObjectStore('thermostat', { autoIncrement: true });

    // Add index for created
    objectStore.createIndex('created', 'created', { unique: false });
  }
};

connection.onsuccess = ({ target: { result } }) => {
  // Stores
  const stores = window.stores = {
    heatingStore: new HeatingStore(result),
  };

  // Create a Provider with props for the stores and the Router as a child
  const provider = React.createElement(Provider, stores, React.createElement(Router));

  ReactDOM.render(provider, document.getElementById('app'));
};
