import { remote } from "electron";
import { I18n } from "../core/i18n";

/**
 * 获取当前活动的浏览器实例
 * - 会出现多个窗口的情况
 */
export function getAppInstance() {
  return remote.BrowserWindow.getFocusedWindow();
}

/**
 * 显示文件名称到标题
 * @param fileName 文件路径
 */
export function showFileName(fileName: string) {
  let title = "";
  if (fileName) {
    let index = fileName.lastIndexOf("/");

    if (fileName.lastIndexOf("\\") > -1) index = fileName.lastIndexOf("\\");
    title = fileName.substring(index + 1) + " - ";
  }

  let appInstance = getAppInstance();
  if (appInstance) {
    appInstance.setTitle(title + I18n.__("sAppName"));
  }
}
