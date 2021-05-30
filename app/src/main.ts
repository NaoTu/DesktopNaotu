// --> ipcMain 主线程使用的代码
import { app, BrowserWindow, globalShortcut, Menu, ipcMain, dialog } from "electron";
import { logger } from "./core/logger";
import { naotuConf } from "./core/conf";
import { sIndexUrl } from "./define";
import { I18n } from "./core/i18n";
import { naotuMenu } from "./ui/menu";

// Main Method
(() => {
  let safeExit = false;

  // 开始记录日志
  logger.info(`app start.`);

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow: Electron.BrowserWindow | null;

  const isDevMode = process.execPath.match(/[\\/]electron/);

  process.on('unhandledRejection', error => {
    logger.error('unhandledRejection');
  });

  // main.ts启动顺序为：读取系统参数（如系统类型、系统语言）、读取用户设置、初始化插件模块、载入系统插件、载入用户插件、启动主界面、载入菜单栏、其他
  const createWindow = async () => {
    // 隐藏菜单栏
    Menu.setApplicationMenu(null);

    // 初始化和更新配置文件
    naotuConf.upgrade();

    // 读取窗口大小
    // 如果宽或高小于700，则使用默认值
    let conf = naotuConf.getModel();
    let userWidth = (conf.editorWindowWidth && conf.editorWindowWidth >= 700)
      ? conf.editorWindowWidth : 1000;
    let userHeight = (conf.editorWindowHeight && conf.editorWindowHeight >= 700)
      ? conf.editorWindowHeight : 800;

    logger.info(`Last saved window size: [${[userWidth, userHeight]}]`);

    // Create the browser window.
    mainWindow = new BrowserWindow({
      minWidth: 700,
      minHeight: 700,
      width: userWidth,
      height: userHeight,

      fullscreenable: true,
      show: false,
      backgroundColor: "#fbfbfb",
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
    });

    // and load the index.html of the app.
    logger.info(`open url ${sIndexUrl} `);
    mainWindow.loadURL(sIndexUrl);

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

    mainWindow.on("close", e => {
      if (!safeExit) {
        if (mainWindow) {
          
          // 保存窗口大小设置
          try {
            // 获取配置文件
            let confObj = naotuConf.getModel();

            // 修改配置项
            confObj.editorWindowWidth = mainWindow.getSize()[0];
            confObj.editorWindowHeight = mainWindow.getSize()[1];

            // 保存配置文件
            naotuConf.save(confObj);

            logger.info(`Saved current window size: [${confObj.editorWindowWidth}, ${confObj.editorWindowHeight}]`);
          } catch (ex) {
            logger.error(ex);
          }

          // 从主进程发送消息给渲染进程
          mainWindow.webContents.send("action", "exit");
        }

        e.preventDefault();
      }
    });

    Menu.setApplicationMenu(naotuMenu.getMenu());
  };

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    if (mainWindow) {
      if (isDevMode) {
        globalShortcut.unregisterAll();
      }

      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== "darwin") {
        app.quit();
      }
    }
    return false;
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
  logger.info(`process.argv: ${process.argv}`);

  // 监听与渲染进程的通信
  ipcMain.on("reqaction", (event: Event, arg: string) => {
    switch (arg) {
      case "exit":
        logger.info("app exit successfully!");

        safeExit = true;
        app.quit(); //退出程序
        break;
    }
  });

  ipcMain.on('getLocale', (event) => {
    event.returnValue = app.getLocale();
  });

  ipcMain.on('setMemu', (event, templateString) => {
    let template = JSON.parse(templateString);
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    event.returnValue = true;
  });

  ipcMain.on('getArgv', (event) => {
    event.returnValue = process.argv;
  });

  ipcMain.on('getUserData', (event) => {
    event.returnValue = app.getPath('userData');
  });

  /* 设置编辑菜单的可选择性 */
  ipcMain.on('setEditMemuEnable', (event, isSelected) => {
    let menu = Menu.getApplicationMenu();
    if (menu) {
      let editItems = (menu.items[1] as any).submenu.items;
      editItems[3].enabled = editItems[4].enabled = editItems[5].enabled = isSelected;
    }
    event.returnValue = true;
  });

  ipcMain.on('setTitle', (event, title) => {
    BrowserWindow.getFocusedWindow()?.setTitle(title);
    event.returnValue = true;
  });

  ipcMain.on('maxWindow', (event) => {
    BrowserWindow.getFocusedWindow()?.maximize();
    event.returnValue = true;
  });

  ipcMain.on('minWindow', (event) => {
    BrowserWindow.getFocusedWindow()?.minimize();
    event.returnValue = true;
  });

  ipcMain.on('toggleDevTools', (event) => {
    BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools();
    event.returnValue = true;
  });

  ipcMain.on('setFileNameToTitle', (event, fileName) => {
    let title = "";
    if (fileName) {
      let index = fileName.lastIndexOf("/");
  
      if (fileName.lastIndexOf("\\") > -1) index = fileName.lastIndexOf("\\");
      title = fileName.substring(index + 1) + " - ";
    }
  
    let appInstance = BrowserWindow.getFocusedWindow();
    if (appInstance) {
      appInstance.setTitle(title + I18n.__("sAppName"));
    }
  });

  ipcMain.on('openDialog', (event, argvString) => {
    let argv = JSON.parse(argvString);
    dialog.showOpenDialog(argv)
      .then(result => {
        event.sender.send('openDialog-reply', JSON.stringify(result));
      })
  });

  ipcMain.on('saveDialog', (event, argvString) => {
    let argv = JSON.parse(argvString);
    dialog.showOpenDialog(argv)
      .then(result => {
        event.sender.send('saveDialog-reply', JSON.stringify(result));
      })
  });
})();
