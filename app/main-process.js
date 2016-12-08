import { app, BrowserWindow } from 'electron';
import path from 'path';

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
    splashWindow.loadURL(path.join('file://', __dirname, '/app/images/splash.png'));
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
        icon: './app/images/icon.png',
        show: false,
        kiosk: useKioskMode,
        autoHideMenuBar: true,
    });

    // Load the React application
    mainWindow.loadURL(path.join('file://', __dirname, '/views/index.html'));

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
