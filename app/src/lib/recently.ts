import { naotuConf, IRecentlyItem } from "../core/conf";
import { naotuMenu } from "./menu";
import { logger } from "../core/logger";
import { openKm } from "./file";
import moment = require("moment");

/**
 * 打开一个最近打开的文件
 * @param menuItem
 */
export function openRecently(menuItem: Electron.MenuItem) {
  openKm(menuItem.label);
}

/**
 * 保存一个文件打开记录
 * @param filePath 文件路径
 */
export function addRecentlyRecord(filePath: string) {
  try {
    let time = moment().format("YYYY-MM-DD HH:mm:ss");

    // 获取配置文件
    let confObj = naotuConf.getModel();

    let list = confObj.recently;

    // 查重
    let items: IRecentlyItem[] = [],
      selected: IRecentlyItem | null = null;

    if (list) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item.path == filePath) {
          selected = item;
        } else {
          items.push(item);
        }
      }
    }

    if (selected == null) {
      // 添加到第一项目
      items.splice(0, 0, { time: time, path: filePath });
    } else {
      // 在原来的清单中，则更新
      selected.time = time;
      items.splice(0, 0, selected);
    }

    confObj.recently = items;

    // 保存配置文件
    naotuConf.save(confObj);

    // 重新显示菜单
    naotuMenu.render();
  } catch (ex) {
    logger.error(ex);
  }
}

/**
 * 清除最近打开的文件记录
 */
export function clearRecently() {
  try {
    // 获取配置文件
    let confObj = naotuConf.getModel();

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
  try {
    // 获取配置文件
    let confObj = naotuConf.getModel();

    // 修改自动保存状态
    confObj.isAutoSave = menuItem.checked;

    // 保存配置文件
    naotuConf.save(confObj);
  } catch (ex) {
    logger.error(ex);
  }
}
