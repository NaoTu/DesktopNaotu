import { remote } from "electron";
import { I18n } from "../core/i18n";
import { naotuBase } from "./base";
import { copy, writeText, writeBuffer } from "../core/io";
import execAsync from "../core/exec";
import { logger } from "../core/logger";
import { hasData, initRoot, getDefaultPath } from "./minder";
import { sIndexUrl } from "../define";
import { getAppInstance } from "./electron";
import { basename } from "path";

//#region 3. 窗口对话框相关

/**
 * 新建文件
 *
 * 快捷键：Ctrl + N
 * 行为：新窗口打开一个空白文档
 */
export function newDialog() {
  // 获取当前执行程序的路径
  let appPath = process.execPath;
  let command = "";

  switch (process.platform) {
    case "win32":
      command = "start " + appPath;
      break;
    case "darwin":
      // TODO： 待验证
      command = appPath;
      break;
    default:
    case "linux":
      // TODO： 待验证
      command = appPath;
      break;
  }

  // 执行打开该文件的命令
  execAsync(command, "")
    .then(output => {
      logger.info(output);
    })
    .catch(err => {
      logger.error("asyncExec err: ", err);
    });
}

/**
 * 关闭文件
 *
 * 快捷键：Ctrl + W
 * 行为：关闭当前文件，如文件有修改，则提示是否保存
 */
export function closeFile() {
  // 如果关闭成功，也触发一次保存事件
  if (naotuBase.HasSaved()) {
    // 若已保存，则直接初始化
    initRoot();

    naotuBase.OnSaved();
    logger.info(`关闭文件: "${naotuBase.getCurrentKm()}"`);
  } else {
    bootbox.confirm({
      message: I18n.__("sCloseTip"),
      callback: (result: boolean) => {
        if (result) {
          initRoot();

          naotuBase.OnSaved();
          logger.info(`关闭文件: "${naotuBase.getCurrentKm()}"`);
        }
      }
    });
  }
}

/**
 * 生成副本
 *
 * Ctrl+Shift+N
 * 复制一个副本，在新窗口打开
 */
export function cloneFile() {
  // 创建一个新文件，并在新窗口打开它
  let srcPath = naotuBase.getCurrentKm();
  if (srcPath) {
    var rootPath = srcPath.replace(basename(srcPath), "");
    let dstKmPath = getDefaultPath(rootPath); // 生成一个文件的地址
    copy(srcPath, dstKmPath); // 复制一份

    // 获取当前执行程序的路径
    let appPath = process.execPath;
    let command = "";

    switch (process.platform) {
      case "win32":
        command = "start " + appPath;
        break;
      case "darwin":
        // TODO： 待验证
        command = appPath;
        break;
      default:
      case "linux":
        // TODO： 待验证
        command = appPath;
        break;
    }

    // 执行打开该文件的命令
    execAsync(command, dstKmPath)
      .then(output => {
        logger.info(output);
      })
      .catch(err => {
        logger.error("asyncExec err: ", err);
      });
  } else {
    new Error("No files are currently open.");
  }
}

// /**
//  * 打开新窗口
//  * tag: absolete
//  */
// export function openWindow() {
//   let newWin: Electron.BrowserWindow | null;

//   newWin = new remote.BrowserWindow({
//     minWidth: 700,
//     minHeight: 700,
//     width: 1000,
//     height: 800,

//     fullscreenable: true,
//     show: false,
//     backgroundColor: "#fbfbfb"
//   });

//   newWin.on("close", function() {
//     if (newWin) newWin = null;
//   });

//   logger.info(`open new window '${sIndexUrl}' `);

//   newWin.loadURL(sIndexUrl);
//   newWin.show();
// }

/**
 * 在文件夹中打开文件
 */
export function openFileInFolder() {
  let path = naotuBase.getCurrentKm();
  if (path) {
    remote.shell.showItemInFolder(path);
  } else {
    bootbox.alert(I18n.__("sNoOpenFile"));
  }
}

// inner function.
export function exportFile(protocol: any, filename: string) {
  let options = {
    download: true,
    filename: filename
  };

  minder.exportData(protocol.name, options).then(function(data: any) {
    switch (protocol.dataType) {
      case "text":
        writeText(filename, data);
        break;
      case "base64":
        let base64Data = data.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = new Buffer(base64Data, "base64");

        writeBuffer(filename, dataBuffer);
        break;
      case "blob":
        break;
    }

    return null;
  });
}

//#endregion

export function maxwin() {
  let appInstance = getAppInstance();
  if (appInstance) {
    appInstance.maximize();
  }
}

export function minwin() {
  let appInstance = getAppInstance();
  if (appInstance) {
    appInstance.minimize();
  }
}
