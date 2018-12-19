import { naotuBase } from "./base";
import { I18n } from "../core/i18n";
import { remote, MenuItemConstructorOptions } from "electron";
import { getAppInstance } from "./electron";
import { join } from "path";
import { naotuConf } from "../core/conf";
import { getBackupDirectoryPath } from "../core/path";
import { existsSync } from "fs";
import { logger } from "../core/logger";

export function setMinder(json: JSON | any) {
  editor.minder.importJson(json);

  // 触发打开方法
  naotuBase.OnOpened();
}

export function getMinder() {
  return editor.minder.exportJson();
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
  naotuBase.setCurrentKm(null);

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
export function getDefaultPath(path?: string | undefined): string {
  // 使用`中心主题`做文件名
  let rootText = editor.minder.getRoot().data.text;

  // 如果没有配置默认路径，就用备份目录
  let dir = naotuConf.getModel().defSavePath || getBackupDirectoryPath();

  // 如果指定了，就用指定的路径
  if (path) dir = path;

  let counter = 0;
  let filePath = join(dir, `${rootText}.km`);

  do {
    filePath = join(dir, `${rootText}${counter++ || ""}.km`);
  } while (existsSync(filePath));

  return filePath;
}

/**
 * 设置选择菜单触发
 * @param isSelected
 */
export function onSelectedNodeItem(isSelected: boolean) {
  try {
    let menu = remote.Menu.getApplicationMenu();
    // 对编辑菜单进行管理
    if (menu) {
      let editItems = (menu.items[1] as any).submenu.items;
      editItems[3].enabled = editItems[4].enabled = editItems[5].enabled = isSelected;
    }
  } catch (ex) {
    logger.error(ex);
  }
}
