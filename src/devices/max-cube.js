import net from 'net';

import Device from './device';

import processHelloMessage from '../messages/process-hello-message';
import processDeviceListMessage from '../messages/process-device-list-message';
import AcknowledgeMessage from '../messages/acknowledge-message';
import ConfigurationMessage from '../messages/configuration-message';
import processMetadataMessage from '../messages/process-metadata-message';

export default class MaxCube extends Device {
    type = 'Cube';

    ipAddress = '';
    portNumber = 0;
    isConnected = false;
    socket = new net.Socket();
    store = null;

    constructor(ipAddress, portNum, store) {
        super({});

        this.ipAddress = ipAddress;
        this.portNumber = portNum;
        this.store = store;

        this.configureSocket();
    }

    // Open a connection
    connect() {
        let connectionPromise;

        if (this.isConnected) {
            // Connection is already open
            connectionPromise = Promise.resolve();
        }
        else {
            // Connection isn't open, so open one
            connectionPromise = new Promise((resolve) => {
                this.socket.connect(this.portNumber, this.ipAddress, () => {
                    this.isConnected = true;
                    resolve();
                });
            });
        }

        return connectionPromise;
    }

    disconnect() {
        // Close the connection straight away
        this.isConnected = false;
        this.socket.destroy();
        this.store.emergencyShutdown();
    }

    configureSocket() {
        this.socket.on('data', (buffer) => {
            const data = buffer.toString('utf-8');
            this.processMessage(data);
        });

        this.socket.on('close', () => {
            this.store.emergencyShutdown();
        });
    }

    sendRequest(type) {
        this.socket.write(`${type}:\r\n`);
    }

    processMessage(data) {
        // Sometimes we get more than one message at the same time
        const pattern = /([A-Z]):([A-Za-z0-9+/=,]+)/g;

        let message = pattern.exec(data);
        while (message !== null) {
            // Get the message header and value
            const header = message[1];
            const value = message[2];

            // Update the current message in the store
            this.store.setMessage(`${new Date().toLocaleTimeString()} - Received '${header}' message with value: ${value}`);

            // Process the message by type
            switch (header) {
                case 'H':
                    processHelloMessage(value, this.store);
                    break;
                case 'M':
                    // If the current part isn't the final part
                    if (parseInt(value.slice(0, 2), 16) !== parseInt(value.slice(3, 5), 16) - 1) {
                        // If this is the first part of the message
                        if (parseInt(value.slice(0, 2), 16) === 0) {
                            // Set the buffer to a new string
                            this.metadataBuffer = value.slice(6);
                        }
                        else {
                            // ADd the message to the buffer
                            this.metadataBuffer += value.slice(6);
                        }
                    }
                    else {
                        // We've got the full message, so process it
                        processMetadataMessage(this.metadataBuffer || value.slice(6), this.store);
                    }
                    break;
                case 'C':
                    ConfigurationMessage(value, this.store);
                    break;
                case 'L':
                    processDeviceListMessage(value, this.store);
                    break;
                case 'A':
                    AcknowledgeMessage(value);
                    break;
                default:
                    break;
            }

            // Get the next match
            message = pattern.exec(data);
        }
    }
}
