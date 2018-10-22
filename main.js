const { app, BrowserWindow, globalShortcut, dialog } = require('electron');
// const windowStateKeeper = require('electron-window-state');
let win;

function createWindow() {
    // // Load the previous state with fallback to defaults 
    // let mainWindowState = windowStateKeeper({
    //     defaultWidth: 1000,
    //     defaultHeight: 800
    // });

    win = new BrowserWindow({
        'minWidth': 700,
        'minHeight': 700,
        'width': 1000,
        'height': 800,

        // 'x': mainWindowState.x,
        // 'y': mainWindowState.y,
        // 'width': mainWindowState.width,
        // 'height': mainWindowState.height,

        'fullscreenable': true,
        'show': false,
        'icon': `${__dirname}/favicon.png`,
        'backgroundColor': '#fbfbfb'
    });

    // Let us register listeners on the window, so we can update the state 
    // automatically (the listeners will be removed when the window is closed) 
    // and restore the maximized or full screen state 
    // mainWindowState.manage(win);

    // win.webContents.openDevTools()

    win.loadURL(`file://${__dirname}/dist/index.html`);

    globalShortcut.register('CmdOrCtrl+Shift+D', () => {
        win.webContents.toggleDevTools();
    });

    win.on('closed', () => {
        win = null;
    });

    win.on('ready-to-show', () => {
        win.show();
        win.focus();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

global.sharedObject = { prop1: process.argv };
