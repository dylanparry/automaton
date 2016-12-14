import { app, BrowserWindow } from 'electron';
import path from 'path';
import net from 'net';

// If running in test mode, fire up a local server
if (process.env.NODE_ENV === 'test') {
    const responses = [
        'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSG08kAAAACxMf4gISGB4iAK8ADBTuNgYSGwQkAAAAygsTCkPsEhtPJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSG08kAAAACxMf4gISGB4iAK8ADBTuNgYSGwQkAAAAywsTCkPsEhtPJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSG08kAAAACxMf4gISGB4iAK8ADBTuNgYSGwQkAAAAywsTCkPsEhtPJADLAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSG08kAMsACxMf4gISGB4iAK8ADBTuNgYSGwQkAAAAywsTCkPsEhtPJADLAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJADLAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJADLAAsUWsBcEhtPFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAMsACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJADLAAsUWsBcEhtPFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAMsACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJADLAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAMsACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKsADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKsADBTuNgYSGAQkAAAAygsTCkPsEhgAJADKAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKkADBTuNgYSGAQkAAAAygsTCkPsEhgAJADKAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKkADBTuNgYSGAQkAAAAygsTCkPsEhgAJADKAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADDAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKkADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADDAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCwiAKcADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADDAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCwiAKcADBTuNgYSGAQkAAAAyAsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADDAAsUXCbhEhgAIACyAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCwiAAAADBTuNgYSGAQkAAAAyAsTCkPsEhgAJAAAAAsUWsBcEhgAFAAAAAsUXc4OEhgAFAAAAAsUXCVcEhgAJAAAAAsUXCbhEhgAIAAAAA==',
        'L:CxMZdgYSGAAkAAAACxMf4gISGCwiAAAADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFAAAAAsUXc4OEhgAFAAAAAsUXCVcEhgAJAAAAAsUXCbhEhgAIAAAAA==',
    ];

    const server = net.createServer((socket) => {
        socket.on('data', (buffer) => {
            const request = buffer.toString('utf-8');
            if (request === 'l:\r\n') {
                const response = responses[Math.floor(Math.random() * responses.length)];
                socket.write(response);
            }
        });

        socket.on('error', () => { });
    });

    server.listen(62910, '127.0.0.1');

    server.on('connection', (socket) => {
        socket.write('H:KEQ0816927,0cc5d6,0113,00000000,1e13c151,00,32,100c0e,0b07,03,0000\r\n');
        socket.write('M:00,01,VgIGAQtIYWxsL1N0YWlycxMZdgYHS2l0Y2hlbhRcJgIGT2ZmaWNlEx/iAwtMaXZpbmcgUm9vbRRawAQOTWFzdGVyIEJlZHJvb20UXc4FC1Nld2luZyBSb29tFFwlCAEUWsBNRVExNzcyODAzFVJhZGlhdG9yIEJlaGluZCBDaGFpcgMBFFwlTUVRMTc3MzE2MAhSYWRpYXRvcgUBFFwmTUVRMTc3MzE2MQhSYWRpYXRvcgYDFO42TkVRMDA4NTcwMApUaGVybW9zdGF0AQETGXZNRVExNDQ1NjAyFFJhZGlhdG9yIDJuZCBMYW5kaW5nAQETCkNNRVExNDQyNzQ5FFJhZGlhdG9yIDFzdCBMYW5kaW5nAQEUXc5NRVExNzczNTgxD1JhZGlhdG9yIChMZWZ0KQQBEx/iTUVRMTQ0NzI2MQhSYWRpYXRvcgIB\r\n');
        socket.write('C:0cc5d6,7QzF1gATAf9LRVEwODE2OTI3AAsABEAAAAAAAAAAAP///////////////////////////wsABEAAAAAAAAAAQf///////////////////////////2h0dHA6Ly9tYXguZXEtMy5kZTo4MC9jdWJlADAvbG9va3VwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEdNVAAACgADAAAAAEJTVAAAAwACAAAOEA==\r\n');
        socket.write('C:131976,0hMZdgEBEKFNRVExNDQ1NjAyKhQ9CQcYA3AM/wAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIA==\r\n');
        socket.write('C:131fe2,0hMf4gECEKFNRVExNDQ3MjYxIhQ9CQcYA3AM/wApICkgKSApICkgKSApIEUgRSBFIEUgRSBFICkgKSApICkgKSApICkgRSBFIEUgRSBFIEUgKElE2DzwKSApICkgKSBFIEUgRSBFIEUgRSAoSUTYPPApICkgKSApIEUgRSBFIEUgRSBFIChJRNg88CkgKSApICkgRSBFIEUgRSBFIEUgKElE2DzwKSApICkgKSBFIEUgRSBFIEUgRSAoSUTYPPApICkgKSApIEUgRSBFIEUgRSBFIA==\r\n');
        socket.write('C:14ee36,zhTuNgMBEP9ORVEwMDg1NzAwKhQ9CShISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgBxhw\r\n');
        socket.write('C:130a43,0hMKQwEBEKFNRVExNDQyNzQ5KhQ9CQcYA3AM/wAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIA==\r\n');
        socket.write('C:145ac0,0hRawAEDEaFNRVExNzcyODAzJBQ9CQcYA3AM/wAoVEhsQMxJCCkgKSApIEUgRSBFIEUgRSBFIChUSGxAzEkIKSApICkgRSBFIEUgRSBFIEUgKEhIbCjMSQgpICkgKSBFIEUgRSBFIEUgRSAoSEhsKMxJCCkgKSApIEUgRSBFIEUgRSBFIChISGwozEkIKSApICkgRSBFIEUgRSBFIEUgKEhIbCjMSQgpICkgKSBFIEUgRSBFIEUgRSAoSEhsKMxJCCkgKSApIEUgRSBFIEUgRSB\r\n');
        socket.write('C:145dce,0hRdzgEEEaFNRVExNzczNTgxIBQ9CQcYA3AM/wAoVEBsKPBBCCkgKSApIEUgRSBFIEUgRSBFIChUQGwo8EEIKSApICkgRSBFIEUgRSBFIEUgKEhAYCjwQQgpICkgKSBFIEUgRSBFIEUgRSAoSEBgKPBBCCkgKSApIEUgRSBFIEUgRSBFIChIQGAo8EEIKSApICkgRSBFIEUgRSBFIEUgKEhAYCjwQQgpICkgKSBFIEUgRSBFIEUgRSAoSEBgKPBBCCkgKSApIEUgRSBFIEUgRSBFIA==\r\n');
        socket.write('C:145c25,0hRcJQEFEaFNRVExNzczMTYwJBQ9CQcYA3AM/wAobEjMQPApICkgKSApIEUgRSBFIEUgRSBFIChsSMxA8CkgKSApICkgRSBFIEUgRSBFIEUgKGxIzEDwKSApICkgKSBFIEUgRSBFIEUgRSAobEjMQPApICkgKSApIEUgRSBFIEUgRSBFIChsSMxA8CkgKSApICkgRSBFIEUgRSBFIEUgKGxIzEDwKSApICkgKSBFIEUgRSBFIEUgRSAobEjMQPApICkgKSApIEUgRSBFIEUgRSBFIA==\r\n');
        socket.write('C:145c26,0hRcJgEGEaFNRVExNzczMTYxJBQ9CQcYA3AM/wAoVEhsQMxI8CkgKSApIEUgRSBFIEUgRSBFIChUSGxAzEjwKSApICkgRSBFIEUgRSBFIEUgKEhIbEDMSPApICkgKSBFIEUgRSBFIEUgRSAoSEhsQMxI8CkgKSApIEUgRSBFIEUgRSBFIChISGxAzEjwKSApICkgRSBFIEUgRSBFIEUgKEhIbEDMSPApICkgKSBFIEUgRSBFIEUgRSAoSEhsQMxI8CkgKSApIEUgRSBFIEUgRSBFIA==\r\n');
        socket.write('L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n');
    });
}

// When the app is ready
app.on('ready', () => {
    // If running on a Pi, it'll be using an ARM processor running Linux
    const useKioskMode = process.arch === 'arm' && process.platform === 'linux';

    // Create a new Browser Window for the splash
    let splashWindow = new BrowserWindow({
        width: 400,
        height: 240,
        resizable: false,
        frame: false,
        show: false,
        skipTaskbar: true,
        alwaysOnTop: true,
    });

    // Load the splash screen image
    const splashPath = path.join('file:///', __dirname, '../images/splash.png');
    splashWindow.loadURL(splashPath);
    splashWindow.webContents.on('did-finish-load', () => {
        splashWindow.show();
    });

    // Dispose of the splash screen when closed
    splashWindow.on('close', () => {
        splashWindow = null;
    });

    // Create a new window set to 800x480 or fullscreen
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 480,
        useContentSize: true,
        resizable: false,
        title: 'automaton',
        icon: './images/icon.png',
        show: false,
        kiosk: useKioskMode,
        autoHideMenuBar: true,
    });

    mainWindow.webContents.openDevTools();

    // Load the React application
    const mainWindowPath = path.join('file:///', __dirname, '../index.html');
    mainWindow.loadURL(mainWindowPath);

    // Wait for the window to finish loading its contents
    mainWindow.webContents.on('did-finish-load', () => {
        // Hide the splash window
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
        }

        // And show the main window
        mainWindow.show();
    });

    // Dispose of the main window when closed
    mainWindow.on('close', () => {
        mainWindow = null;
    });

    // If the main window becomes unresponsive, restart the app
    mainWindow.on('unresponsive', () => {
        app.relaunch();
        app.quit();
    });
});

app.on('window-all-closed', () => {
    // Clean up stuff here

    app.quit();
});

