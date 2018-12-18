import { naotuBase } from "./base";
import { I18n } from "../core/i18n";
import { getAppInstance } from "./electron";

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

  editor.minder.importJson({
    root: { data: { text: I18n.__("sMainTopic") } },
    template: "filetree",
    theme: "fresh-blue"
  });

  editor.minder.select(minder.getRoot(), true);
}
