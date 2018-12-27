import { logger } from "../core/logger";
import { I18n } from "../core/i18n";
import { existsSync } from "fs";
import { readJson, writeJson } from "../core/io";
import { naotuBase } from "./base";
import { showFileName } from "./electron";
import { setMinder, getMinder } from "./minder";

/**
 * 打开一个脑图文件
 * @param filePath 文件路径
 */
export function openKm(filePath: string) {
  try {
    logger.info(`open file: ${filePath}`);
    if (!existsSync(filePath)) throw new Error(`file not found, ${filePath}`);

    // 开启状态保护
    naotuBase.setState("opening");

    naotuBase.setCurrentKm(filePath);

    setMinder(readJson(filePath));

    showFileName(filePath);
    
    naotuBase.setState("none");
  } catch (error) {
    logger.error("openKm error, ", error);
  }
}

/**
 * 保存一个脑图文件
 * @param filePath 文件路径
 */
export function saveKm(filePath: string) {
  try {
    var minder = getMinder();

    // 修改内容时，记录日志
    logger.info(`${filePath} => ${JSON.stringify(minder)}`);
    
    naotuBase.setState("saving");

    naotuBase.setCurrentKm(filePath);

    writeJson(filePath, minder);

    showFileName(filePath);

    naotuBase.OnSaved();

    naotuBase.setState("none");
  } catch (error) {
    logger.error("saveKm error, ", error);
  }
}

/**
 * 拖拽打开文件
 */
export function openFileByDrop() {
  logger.info("Start drag and drop Open File.");

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
