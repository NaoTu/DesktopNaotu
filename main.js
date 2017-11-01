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


const electron = require('electron');

//自动更新
const autoUpdater = electron.autoUpdater;

function startupEventHandle() {
    if (require('electron-squirrel-startup')) return;
    var handleStartupEvent = function () {
        if (process.platform !== 'win32') {
            return false;
        }
        var squirrelCommand = process.argv[1];
        switch (squirrelCommand) {
            case '--squirrel-install':
            case '--squirrel-updated':
                install();
                return true;
            case '--squirrel-uninstall':
                uninstall();
                app.quit();
                return true;
            case '--squirrel-obsolete':
                app.quit();
                return true;
        }
        // 安装
        function install() {
            var cp = require('child_process');
            var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
            var target = path.basename(process.execPath);
            var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
            child.on('close', function (code) {
                app.quit();
            });
        }
        // 卸载
        function uninstall() {
            var cp = require('child_process');
            var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
            var target = path.basename(process.execPath);
            var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
            child.on('close', function (code) {
                app.quit();
            });
        }
    };
    if (handleStartupEvent()) {
        return;
    }
}

function updateHandle() {
    ipc.on('check-for-update', function (event, arg) {
        let appName = '桌面版脑图';
        let appIcon = __dirname + '/favicon.ico';
        let message = {
            error: '检查更新出错',
            checking: '正在检查更新……',
            updateAva: '下载更新成功',
            updateNotAva: '现在使用的就是最新版本，不用更新',
            downloaded: '最新版本已下载，将在重启程序后更新'
        };
        const os = require('os');
        const { dialog } = require('electron');
        //https://github.com/topcss/DesktopNaotu/releases/download/v0.1.5/DesktopNaotu-v0.1.5-darwin-x64.zip
        autoUpdater.setFeedURL('https://github.com/topcss/DesktopNaotu/releases/download/');
        autoUpdater.on('error', function (error) {
            return dialog.showMessageBox(mainWindow, {
                type: 'info',
                icon: appIcon,
                buttons: ['OK'],
                title: appName,
                message: message.error,
                detail: '\r' + error
            });
        })
            .on('checking-for-update', function (e) {
                return dialog.showMessageBox(mainWindow, {
                    type: 'info',
                    icon: appIcon,
                    buttons: ['OK'],
                    title: appName,
                    message: message.checking
                });
            })
            .on('update-available', function (e) {
                var downloadConfirmation = dialog.showMessageBox(mainWindow, {
                    type: 'info',
                    icon: appIcon,
                    buttons: ['OK'],
                    title: appName,
                    message: message.updateAva
                });
                if (downloadConfirmation === 0) {
                    return;
                }
            })
            .on('update-not-available', function (e) {
                return dialog.showMessageBox(mainWindow, {
                    type: 'info',
                    icon: appIcon,
                    buttons: ['OK'],
                    title: appName,
                    message: message.updateNotAva
                });
            })
            .on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
                var index = dialog.showMessageBox(mainWindow, {
                    type: 'info',
                    icon: appIcon,
                    buttons: ['现在重启', '稍后重启'],
                    title: appName,
                    message: message.downloaded,
                    detail: releaseName + "\n\n" + releaseNotes
                });
                if (index === 1) return;
                autoUpdater.quitAndInstall();
            });
        autoUpdater.checkForUpdates();
    });
}