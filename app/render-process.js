import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { webFrame } from 'electron';

import HeatingStore from './stores/heating-store';
import WeatherStore from './stores/weather-store';

import App from './views/app';

// Disable zooming
webFrame.setZoomLevelLimits(1, 1);

const connection = window.indexedDB.open('automaton', 2);

connection.onupgradeneeded = ({ target: { result } }) =>
{
  const database = result;

  // Create a table for rooms
  if (!database.objectStoreNames.contains('rooms'))
  {
    const objectStore = database.createObjectStore('rooms', { autoIncrement: true });

    // Add indexes for roomId and created
    objectStore.createIndex('roomId', 'roomId', { unique: false });
    objectStore.createIndex('created', 'created', { unique: false });
  }

  // Create a table for thermostat
  if (!database.objectStoreNames.contains('thermostat'))
  {
    const objectStore = database.createObjectStore('thermostat', { autoIncrement: true });

    // Add index for created
    objectStore.createIndex('created', 'created', { unique: false });
  }

  // Create a table for weather
  if (!database.objectStoreNames.contains('weather'))
  {
    database.createObjectStore('weather', { keyPath: 'type' });
  }
};

connection.onsuccess = ({ target: { result } }) =>
{
  // Stores
  const stores = {
    heatingStore: new HeatingStore(result),
    weatherStore: new WeatherStore(result),
  };

  // Create a Provider with props for the stores and the Router as a child
  const provider = React.createElement(Provider, stores, React.createElement(App));

  ReactDOM.render(provider, document.getElementById('app'));
};
