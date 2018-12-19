import { remote } from "electron";
import { sExportTitle, arrExtensions } from "../define";
import { naotuBase } from "./base";
import { saveKm, openKm } from "./file";
import { naotuConf } from "../core/conf";
import { join, basename } from "path";
import { getUserDataDir } from "../core/path";
import { I18n } from "../core/i18n";
import { logger } from "../core/logger";
import { exportFile } from "./window";
import { getDefaultPath } from "./minder";

/**
 * 打开脑图文件
 *
 * 快捷键：Ctrl + O
 * 行为：弹出打开对话框，并在新窗口中载入选择的文件
 */
export function openDialog() {
  if (naotuBase.HasSaved()) {
    // 已经保存了，本窗口打开
    remote.dialog.showOpenDialog(
      { filters: [{ name: sExportTitle, extensions: arrExtensions }] },
      fileNames => {
        if (!fileNames) return;

        openKm(fileNames[0]);
      }
    );
  } else {
    bootbox.alert(I18n.__("sSaveTip"));
  }
}

/**
 * 保存脑图文件
 *
 * 快捷键：Ctrl + S
 * 行为：新建文件=另存为；老文件=保存修改
 */
export function saveDialog() {
  let path = naotuBase.getCurrentKm();
  if (path) {
    saveKm(path);
  } else {
    let conf = naotuConf.getModel();
    if (conf.isAutoSave) {
      // 如果开启了自动保存，就获取一个路径，直接保存
      saveKm(getDefaultPath());
    } else {
      // 否则，调用另存为
      saveAsDialog();
    }
  }
}

/**
 * 另存为脑图
 *
 * 快捷键：Ctrl + Shift + S
 * 行为：弹出保存对话框，选择保存路径及文件名后，保存当前文件
 */
export function saveAsDialog() {
  let newPath = join(getUserDataDir(), `${minder.getRoot().data.text}.km`);

  // 如果有，通过当前文件路径，生成一个新的文件路径
  let srcPath = naotuBase.getCurrentKm();
  if (srcPath) {
    let rootPath = srcPath.replace(basename(srcPath), "");
    newPath = getDefaultPath(rootPath); // 生成一个文件的地址
  }

  remote.dialog.showSaveDialog(
    {
      title: I18n.__("sSaveKm"),
      defaultPath: newPath,
      filters: [{ name: sExportTitle, extensions: arrExtensions }]
    },
    filePath => {
      if (!filePath) return; // cancel save

      saveKm(filePath);

      naotuBase.setCurrentKm(filePath);
    }
  );
}

/**
 * 重选自动保存的目录
 */
export function setSavePath() {
  try {
    let conf = naotuConf.getModel();

    remote.dialog.showOpenDialog(
      { properties: ["openDirectory"], defaultPath: conf.defSavePath },
      fileNames => {
        if (fileNames) {
          // 更新配置文件
          conf.defSavePath = fileNames[0];
          naotuConf.save(conf);
        }
      }
    );
  } catch (ex) {
    logger.error(ex);
  }
}

/**
 * 导出文件
 */
export function exportDialog() {
  let newPath = join(getUserDataDir(), minder.getRoot().data.text);

  let filters = [];
  let pool = kityminder.data.getRegisterProtocol();
  for (let name in pool) {
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

      let ext = fileName.toLowerCase().substring(fileName.lastIndexOf("."));
      let protocol = null;
      let pool = kityminder.data.getRegisterProtocol();
      for (let name in pool) {
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
