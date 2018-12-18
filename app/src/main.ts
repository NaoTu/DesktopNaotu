// --> ipcMain 主线程使用的代码
import { app, BrowserWindow, globalShortcut, Menu } from "electron";
import { join } from "path";
import { logger } from "./core/logger";
import { buildDefaultMenu } from "./menu/build-default-menu";
import { DesktopConfig } from "./core/conf";
import { sIndexUrl } from "./define";
import { func } from "./lib/func";

// Main Method
(() => {
  func.cloneFile();
  // 开始记录日志
  logger.info(`app start ${(process.platform, process.pid)}`);

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow: Electron.BrowserWindow | null;

  const isDevMode = process.execPath.match(/[\\/]electron/);

  // main.ts启动顺序为：读取系统参数（如系统类型、系统语言）、读取用户设置、初始化插件模块、载入系统插件、载入用户插件、启动主界面、载入菜单栏、其他
  const createWindow = async () => {
    // 隐藏菜单栏
    Menu.setApplicationMenu(null);

    // 加载配置
    let configFile = new DesktopConfig();
    configFile.upgrade();

    logger.info("app upgrade config.");

    // Create the browser window.
    mainWindow = new BrowserWindow({
      minWidth: 700,
      minHeight: 700,
      width: 1000,
      height: 800,

      fullscreenable: true,
      show: false,
      backgroundColor: "#fbfbfb"
    });

    // if (process.platform === 'linux') {
    //   windowOptions.icon = join(__dirname, '/app/ico/your-ico.png')
    // }

    // and load the index.html of the app.
    let pageUrl = join(`file://${__dirname}`, sIndexUrl);
    logger.info(`open url ${pageUrl} `);

    mainWindow.loadURL(pageUrl);

    // init menu
    let menu = buildDefaultMenu();
    Menu.setApplicationMenu(menu);

    globalShortcut.register("CmdOrCtrl+Shift+D", () => {
      if (mainWindow) {
        // Open the DevTools.
        mainWindow.webContents.toggleDevTools();
      }
    });

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });

    mainWindow.on("ready-to-show", () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
  };

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    if (isDevMode) {
      globalShortcut.unregisterAll();
    }

    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      logger.info("app quit");

      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.

  // global.sharedObject = { prop1: process.argv };
  //  global.sharedObject = { prop1: process.argv };
})();
