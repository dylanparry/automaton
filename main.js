import electron, { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Backlight from './src/utils/backlight';
import Gpio from './src/utils/gpio';

// Listen for close commands
ipcMain.on('close', () => {
    app.quit();
});

// Listen for restart commands
ipcMain.on('restart', () => {
    app.relaunch();
    app.quit();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('ready', () => {
    // Get the width and height of the screen
    const { width, height } = electron.screen.getPrimaryDisplay().size;

    // If the width and height 800x480, then app should be in kiosk mode
    const kioskMode = width === 800 && height === 480;

    // Splash window
    const splashWindow = new BrowserWindow({
        width: 400,
        height: 240,
        useContentSize: true,
        resizable: false,
        frame: false,
        show: false,
        skipTaskbar: true,
        alwaysOnTop: true,
    });

    // Load the splash screen image
    splashWindow.loadURL(path.join('file://', __dirname, '/splash.png'));
    splashWindow.webContents.on('did-finish-load', () => {
        splashWindow.show();
    });

    // Create a new window set to 800x480 or fullscreen
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 480,
        useContentSize: true,
        resizable: false,
        title: 'automaton',
        icon: './icon.png',
        show: false,
    });

    // Don't show the menu bar
    mainWindow.setMenuBarVisibility(false);

    // Load the React application
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));

    // Wait for the window to finish loading its contents
    mainWindow.webContents.on('did-finish-load', () => {
        // Hide the splash window
        if (!splashWindow.isDestroyed()) {
            splashWindow.close();
        }

        // Now set to kiosk mode if applicable
        mainWindow.setKiosk(kioskMode);
        // mainWindow.webContents.openDevTools();

        // And show the main window
        mainWindow.show();
    });

    // Dispose of the window when it's closed
    mainWindow.on('closed', () => {
        mainWindow = null;

        // Make sure the backlight is at full brightness
        Backlight.toMaximumBrightness();

        // Turn the thermostat off
        Gpio.setInactive();
    });

    // If the main window becomes unresponsive, restart the app
    mainWindow.on('unresponsive', () => {
        app.relaunch();
        app.exit();
    });
});
