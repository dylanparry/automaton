import { action, computed, observable, reaction } from 'mobx';
import moment from 'moment';

import MaxCube from '../house/max-cube';
import MessageProcessor from '../messages/message-processor';
import MetadataMessage from '../messages/metadata-message';
import DeviceListMessage from '../messages/device-list-message';
import Gpio from '../utils/gpio';

export default class HeatingStore
{
  @observable connected = false;
  @observable cube = null;
  @observable rooms = [];
  @observable devices = [];
  @observable thermostatIsActive = false;

  database;
  deviceListInterval;

  constructor(database)
  {
    this.database = database; // An indexedDB database

    this.cube = new MaxCube({
      ipAddress: process.env.NODE_ENV === 'test' ? '127.0.0.1' : '192.168.0.3',
      port: 62910,
    });

    this.cube.listen(data => this.processMessage(data));

    this.cube.errorHandler(() =>
    {
      // Stop sending device list requests
      clearInterval(this.deviceListInterval);

      // Remove all rooms
      this.rooms.replace([]);

      // Turn off the thermostat
      Gpio.setInactive();
    });

    // Connect to the cube
    this.connectToCube();

    // Need to watch this.thermostatShouldBeActive for any changes
    reaction(() => this.thermostatShouldBeActive, (value) =>
    {
      this.thermostatIsActive = value; // Store the value for later
    });

    // Update the database with the latest temperature data
    this.updateTemperatureDatabase();
  }

  connectToCube()
  {
    // Connect to the cube, then request device list every 10 seconds
    this.cube.connect().then(() =>
    {
      this.connected = true;

      this.deviceListInterval = setInterval(() =>
      {
        this.cube.requestDeviceList();
      }, 10000);
    });
  }

  disconnectFromCube()
  {
    // Disconnect the cube
    this.cube.disconnect();
    this.connected = false;
  }

  updateTemperatureDatabase()
  {
    // Only run if on a quarter hour
    const minutes = moment().minutes();
    if (minutes === 0 || minutes === 15 || minutes === 30 || minutes === 45)
    {
      // Begin a transaction
      const transaction = this.database.transaction(['rooms'], 'readwrite');
      const store = transaction.objectStore('rooms');

      // Loop through the rooms
      for (let i = 0; i < this.rooms.length; i += 1)
      {
        const room = this.rooms[i];

        // If the room reports a temperature, store it in the database
        if (room.actualTemperature !== null)
        {
          const update = {
            roomId: room.id,
            temperature: room.actualTemperature,
            created: moment().toDate(),
          };
          store.add(update);
        }
      }

      // Select any data older than 24 hours
      const query = store.index('created')
        .openCursor(IDBKeyRange.upperBound(moment().subtract(24, 'h').toDate()));

      // When done selecting, delete the old data
      query.onsuccess = (result) =>
      {
        const cursor = result.target.result;

        // Delete the items selected
        if (cursor)
        {
          store.delete(cursor.primaryKey);
          cursor.continue();
        }
      };
    }

    // Call this function again in 1 minute
    setTimeout(this.updateTemperatureDatabase.bind(this), 60000);
  }

  @action processMessage(data)
  {
    // Sometimes we get more than one message at the same time
    const pattern = /[A-Z]:[A-Za-z0-9+/=,]+/g;

    // Get the first match
    let match = pattern.exec(data);

    // While there are matches
    while (match !== null)
    {
      // Process the match
      const result = MessageProcessor.process(match[0]);

      // If the returned message is a metadata message
      if (result instanceof MetadataMessage)
      {
        // Merge the rooms with the local copy
        this.rooms.replace(result.rooms);
        this.devices.replace(result.devices);
      }

      // If the returned message is a device list message
      if (result instanceof DeviceListMessage)
      {
        // Loop through the updates and apply them to each device
        for (let i = 0; i < result.updates.length; i += 1)
        {
          // Find the device to update
          const device = this.devices.find(
            d => d.rfAddress === result.updates[i].rfAddress,
          );

          // If a device was found, update it
          if (typeof device !== 'undefined')
          {
            Object.assign(device, result.updates[i]);
          }
        }
      }

      // Get the next match
      match = pattern.exec(data);
    }
  }

  @computed get thermostatShouldBeActive()
  {
    // Get the number of rooms with radiators turned on
    const roomsNeedingHeat = this.rooms.filter(room => room.radiatorsOn).length;

    // Get the number of devices reporting errors
    const devicesInErrorState = this.devices.filter(device => device.hasErrors).length;

    // Check if thermostat should be active
    const thermostatShouldBeActive = roomsNeedingHeat > 0 && devicesInErrorState === 0;

    // Turn the thermostat on or off
    if (thermostatShouldBeActive)
    {
      Gpio.setActive();

      // Update database with value '1'
      const transaction = this.database.transaction(['thermostat'], 'readwrite');
      const store = transaction.objectStore('thermostat');
      const update = {
        status: 1,
        created: moment().toDate(),
      };
      store.add(update);
    }
    else
    {
      Gpio.setInactive();

      // Update database with value '0'
      const transaction = this.database.transaction(['thermostat'], 'readwrite');
      const store = transaction.objectStore('thermostat');
      const update = {
        status: 0,
        created: moment().toDate(),
      };
      store.add(update);
    }

    return thermostatShouldBeActive;
  }

  @computed get hasActiveProgram()
  {
    const rooms = this.rooms.filter(room => room.hasActiveProgram);

    return rooms.length > 0;
  }

  @computed get hasErrors()
  {
    // Loop through the rooms
    for (let i = 0; i < this.rooms.length; i += 1)
    {
      const room = this.rooms[i];

      // If any room has an error, return true and end the function early
      if (room.hasErrors)
      {
        return true;
      }
    }

    // No rooms had errors, so return false
    return false;
  }
}
