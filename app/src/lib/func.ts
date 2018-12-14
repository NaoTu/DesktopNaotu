import { remote } from "electron";
import { join } from "path";
import { getUserDataDir } from "../core/path";
import { I18n } from "../core/i18n";
import { logger } from "../core/logger";
import { DesktopConfig } from "../core/conf";
import { writeJson, readJson, writeText, writeBuffer } from "../core/io";
import {
  arrExtensions,
  sExportTitle,
  sIndexUrl,
  sLicenseUrl,
  sAboutText
} from "../define";

let configFile = new DesktopConfig();

//#region 1. 文件读写操作相关

/**
 * 获取一个默认的保存路径
 */
function getDefaultPath() {
  let d = new Date();
  let time =
    `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}_` +
    `${(d.getHours(), d.getMinutes(), d.getSeconds())}`;

  let defPath = configFile.getModel().defSavePath || getUserDataDir();

  return join(defPath, `${time}.km`);
}

/**
 * 拖拽打开文件
 */
function dropOpenFile() {
  let body = document.body;

  body.ondrop = e => {
    e.preventDefault();
    if (e.dataTransfer) {
      let file = e.dataTransfer.files[0];
      if (!file.name.toLowerCase().endsWith(".km")) {
        bootbox.alert(I18n.__("sLoadedError"));
        return false;
      }

      openKm(file.path);
    }

    return false;
  };

  body.ondragover = body.ondragleave = body.ondragend = function() {
    return false;
  };
}

/**
 * 打开一个脑图文件
 * @param filePath 文件路径
 */
function openKm(filePath: string) {
  try {
    editor.minder.importJson(readJson(filePath));

    showFileName(filePath);

    currentFilePath = filePath;
  } catch (error) {
    logger.error(error);
  }
}

/**
 * 保存一个脑图文件
 * @param filePath 文件路径
 */
function saveKm(filePath: string) {
  try {
    writeJson(filePath, editor.minder.exportJson());

    currentFilePath = filePath;
  } catch (error) {
    logger.error(error);
  }
}

/**
 * 打开脑图文件
 */
function openDialog() {
  remote.dialog.showOpenDialog(
    { filters: [{ name: sExportTitle, extensions: arrExtensions }] },
    fileNames => {
      if (!fileNames) return;

      open(fileNames[0]);
    }
  );
}

/**
 * 保存脑图文件
 */
function saveDialog() {
  if (currentFilePath) {
    saveKm(currentFilePath);
  } else {
    let conf = configFile.getModel();
    if (conf.isAutoSave) {
      // 如果开启了自动保存，就获取一个路径，直接保存
      currentFilePath = getDefaultPath();

      saveKm(currentFilePath);
    } else {
      // 否则，调用另存为
      saveAsDialog();
    }
  }
}

/**
 * 另存为脑图
 */
function saveAsDialog() {
  let newPath = join(getUserDataDir(), `${minder.getRoot().data.text}.km`);

  remote.dialog.showSaveDialog(
    {
      title: I18n.__("sSaveKm"),
      defaultPath: newPath,
      filters: [{ name: sExportTitle, extensions: arrExtensions }]
    },
    fileName => {
      if (!fileName) return; // cancel save

      saveKm(fileName);

      currentFilePath = fileName;
    }
  );
}

//#endregion

//#region 2. 脑图实例相关

/**
 * 检查是不是空白的数据
 */
function hasData() {
  let nodes = editor.minder.getAllNode().length;
  let rootText = editor.minder.getRoot().data.text;

  return nodes != 1 || rootText != I18n.__("sMainTopic");
}

/**
 * 初始化根节点
 */
function initRoot() {
  currentFilePath = null;

  let appInstance = getAppInstance();
  if (appInstance) {
    appInstance.setTitle(I18n.__("sAppName"));
  }

  editor.minder.importJson({
    root: { data: { text: I18n.__("sMainTopic") } },
    template: "filetree",
    theme: "fresh-blue"
  });

  editor.minder.select(minder.getRoot(), true);
}

//#endregion

//#region 3. 窗口对话框相关

/**
 * 新建文件
 */
function newDialog() {
  //
}

/**
 * 生成副本
 */
function cloneFile() {
  //
}

/**
 * 关闭文件
 */
function closeFile() {
  logger.info(`关闭文件: "${currentFilePath}"`);

  if (hasData()) {
    bootbox.confirm({
      // TODO,
      message: I18n.__("sNewKm"),
      callback: (result: any) => {
        if (result) {
          initRoot();
        }
      }
    });
  } else {
    initRoot();
  }
}

/**
 * 打开新窗口
 */
function openWindow() {
  let newWin: Electron.BrowserWindow | null;

  newWin = new remote.BrowserWindow({
    minWidth: 700,
    minHeight: 700,
    width: 1000,
    height: 800,

    fullscreenable: true,
    show: false,
    backgroundColor: "#fbfbfb"
  });

  newWin.on("close", function() {
    if (newWin) newWin = null;
  });

  let pageUrl = join(`file://${__dirname}`, "../", sIndexUrl);
  logger.info(`open new window '${pageUrl}' `);

  newWin.loadURL(pageUrl);
  newWin.show();
}

/**
 * 在文件夹中打开文件
 */
function openFileInFolder() {
  if (currentFilePath != null) {
    remote.shell.showItemInFolder(currentFilePath);
  } else {
    bootbox.alert(I18n.__("sNoOpenFile"));
  }
}

// inner function.
function exportFile(protocol: any, filename: string) {
  var options = {
    download: true,
    filename: filename
  };

  minder.exportData(protocol.name, options).then(function(data: any) {
    switch (protocol.dataType) {
      case "text":
        writeText(filename, data);
        break;
      case "base64":
        var base64Data = data.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, "base64");

        writeBuffer(filename, dataBuffer);
        break;
      case "blob":
        break;
    }

    return null;
  });
}

/**
 * 导出文件
 */
function exportDialog() {
  var newPath = join(getUserDataDir(), minder.getRoot().data.text);

  var filters = [];
  var pool = kityminder.data.getRegisterProtocol();
  for (var name in pool) {
    if (pool.hasOwnProperty(name) && pool[name].encode) {
      filters.push({
        name: pool[name].fileDescription,
        extensions: [pool[name].fileExtension.replace(".", "")]
      });
    }
  }

  remote.dialog.showSaveDialog(
    {
      title: I18n.__("sExportKm"),
      defaultPath: newPath,
      filters: filters
    },
    function(fileName) {
      if (!fileName) return; // cancel export

      var ext = fileName.toLowerCase().substring(fileName.lastIndexOf("."));
      var protocol = null;
      var pool = kityminder.data.getRegisterProtocol();
      for (var name in pool) {
        if (pool.hasOwnProperty(name) && pool[name].encode) {
          if (pool[name].fileExtension === ext) {
            protocol = pool[name];
            break;
          }
        }
      }

      exportFile(protocol, fileName);
    }
  );
}

// 重选自动保存的目录
function setSavePath() {
  try {
    let conf = configFile.getModel();

    remote.dialog.showOpenDialog(
      { properties: ["openDirectory"], defaultPath: conf.defSavePath },
      fileNames => {
        if (fileNames) {
          // 更新配置文件
          conf.defSavePath = fileNames[0];
          configFile.save(conf);
        }
      }
    );
  } catch (ex) {
    logger.error(ex);
  }
}

//#endregion

//#region 4. electron 窗口相关

/**
 * 获取当前活动的浏览器实例
 * - 会出现多个窗口的情况
 */
function getAppInstance() {
  return remote.BrowserWindow.getFocusedWindow();
}

/**
 * 显示文件名称到标题
 * @param fileName 文件路径
 */
function showFileName(fileName: string) {
  if (fileName != undefined) {
    var index = fileName.lastIndexOf("/");

    if (fileName.lastIndexOf("\\") > -1) index = fileName.lastIndexOf("\\");
    var title = fileName.substring(index + 1) + " - " + I18n.__("sAppName");

    let appInstance = getAppInstance();
    if (appInstance) {
      appInstance.setTitle(title);
    }
  }
}

//#endregion

//#region 5. 其他功能

function exitApp() {
  logger.info("exit successfully!");

  remote.app.quit();
}

function redo() {
  editor.history.redo();
}

function undo() {
  editor.history.undo();
}

function maxwin() {
  let appInstance = getAppInstance();
  if (appInstance) {
    appInstance.maximize();
  }
}

function minwin() {
  let appInstance = getAppInstance();
  if (appInstance) {
    appInstance.minimize();
  }
}

function license() {
  remote.shell.openExternal(sLicenseUrl);
}

function about() {
  bootbox.alert({ title: I18n.__("sAppName"), message: sAboutText });
}

//#endregion

/**
 * 当前打开文件的路径
 */
export let currentFilePath: string | null;

/**
 * 导出接口
 */
export const func = {
  openDialog,
  saveDialog,
  saveAsDialog,
  newDialog,
  openWindow,
  openFileInFolder,
  setSavePath,
  exportDialog,
  exitApp,
  redo,
  undo,
  maxwin,
  minwin,
  license,
  about,
  dropOpenFile
};
