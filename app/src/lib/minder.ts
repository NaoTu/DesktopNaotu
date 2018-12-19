import { naotuBase } from "./base";
import { I18n } from "../core/i18n";
import { getAppInstance } from "./electron";
import { join } from "path";
import { naotuConf } from "../core/conf";
import { getBackupDirectoryPath } from "../core/path";
import { existsSync } from "fs";

export function setMinder(json: JSON | any) {
  editor.minder.importJson(json);
}

export function getMinder() {
  return editor.minder.exportJson();
}

/**
 * 判断是否保存了
 */
export function hasSaved() {
  // 有数据 -> 继续判断
  if (hasData()) {
    // 启动自动保存 -> 保存了
    // 否则 -> 没有保存
    return naotuConf.getModel().isAutoSave;
  }
  // 没有数据 -> 通过判断
  return true;
}

/**
 * 检查是不是空白的数据
 */
export function hasData() {
  let nodes = editor.minder.getAllNode().length;
  let rootText = editor.minder.getRoot().data.text;

  return nodes != 1 || rootText != I18n.__("sMainTopic");
}

/**
 * 初始化根节点
 */
export function initRoot() {
  naotuBase.setCurrentFilePath(null);

  let appInstance = getAppInstance();
  if (appInstance) {
    appInstance.setTitle(I18n.__("sAppName"));
  }

  setMinder({
    root: { data: { text: I18n.__("sMainTopic") } },
    template: "filetree",
    theme: "fresh-blue"
  });

  editor.minder.select(minder.getRoot(), true);
}

/**
 * 获取一个默认路径
 */
export function getDefaultPath(): string {
  // 使用`中心主题`做文件名
  let rootText = editor.minder.getRoot().data.text;

  // 如果没有配置默认路径，就用备份目录
  let dir = naotuConf.getModel().defSavePath || getBackupDirectoryPath();

  let counter = 0;
  let filePath = join(dir, `${rootText}.km`);

  do {
    filePath = join(dir, `${rootText}${counter++ || ""}.km`);
  } while (existsSync(filePath));

  return filePath;
}
