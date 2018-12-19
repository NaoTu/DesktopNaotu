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
    if (!existsSync(filePath)) throw new Error(`file not found, ${filePath}`);

    setMinder(readJson(filePath));

    showFileName(filePath);

    naotuBase.setCurrentKm(filePath);
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
    writeJson(filePath, getMinder());

    showFileName(filePath);

    naotuBase.setCurrentKm(filePath);
    naotuBase.OnSaved();
  } catch (error) {
    logger.error("saveKm error, ", error);
  }
}

/**
 * 拖拽打开文件
 */
export function dropOpenFile() {
  logger.info("allow drop Open File");

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
