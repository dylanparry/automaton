import net from 'net';
import { observable } from 'mobx';

export default class MaxCube {
    @observable isConnected = false;
    socket = new net.Socket();
    ipAddress = null;
    port = null;

    constructor({ ipAddress, port }) {
        this.ipAddress = ipAddress;
        this.port = port;
    }

    // Connects to the Cube and returns a promise
    connect() {
        // If already connected, just resolve the promise
        if (this.isConnected) {
            return Promise.resolve();
        }

        // Return a new promise that resolves when the connection is established
        return new Promise((resolve) => {
            this.socket.connect({ port: this.port, host: this.ipAddress }, () => {
                this.isConnected = true;
                resolve();
            });
        });
    }

    // Closes the connection to the cube
    disconnect() {
        this.isConnected = false;
        this.socket.destroy();
    }

    // Calls the callback function with string data from the buffer
    listen(callback) {
        this.socket.on('data', (buffer) => {
            const data = buffer.toString('utf-8');
            callback(data);
        });
    }

    // Calls the callback function in case of an error or disconnection
    errorHandler(callback) {
        this.socket.on('error', callback);
        this.socket.on('close', callback);
        this.socket.on('timeout', callback);
        this.socket.on('end', callback);
    }

    // Sends a request for device list
    requestDeviceList() {
        // Don't do anything if the cube isn't connected
        if (this.isConnected) {
            this.socket.write('l:\r\n');
        }
    }
}
