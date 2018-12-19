import { naotuConf } from "../core/conf";
import { naotuMenu } from "./menu";
import { logger } from "../core/logger";
import { openKm } from "./file";

/**
 * 打开一个最近打开的文件
 * @param menuItem
 */
export function openRecently(menuItem: Electron.MenuItem) {
  openKm(menuItem.label);
}

/**
 * 清除最近打开的文件记录
 */
export function clearRecently() {
  try {
    // 获取配置文件
    var confObj = naotuConf.getModel();

    // 清空历史记录的列表
    confObj.recently = [];

    // 保存配置文件
    naotuConf.save(confObj);

    // 重新显示菜单
    naotuMenu.render();
  } catch (ex) {
    logger.error(ex);
  }
}

/**
 * 切换自动保存状态
 * @param menuItem
 */
export function autoSave(menuItem: Electron.MenuItem) {
  // 获取配置文件
  var confObj = naotuConf.getModel();

  // 修改自动保存状态
  confObj.isAutoSave = menuItem.checked;

  // 保存配置文件
  naotuConf.save(confObj);
}
