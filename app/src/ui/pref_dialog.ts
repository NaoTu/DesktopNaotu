import { I18n } from "../core/i18n";
import { naotuConf } from "../core/conf";
import { readText } from "../core/io";
import { getLogDirectoryPath } from "../core/path";
import { logger } from "../core/logger"


export function preferencesDialog() {
  // 先关闭所有对话框
  bootbox.hideAll();

  // 借助全局的bootbox对象传递配置数据
  // 直接给前端的对象添加成员，即可实现前后端交换数据，而无需IPC通信
  let conf = naotuConf.getModel();
  bootbox.NAOTU_CONFIG = conf;
  bootbox.NAOTU_LOG_PATH = getLogDirectoryPath();

  bootbox.dialog({
    title: "偏好设置",
    message: readText(`${__dirname}/pref_dialog.seg.html`),
    size: "large",
    onEscape: true,
    // scrollable: true,
    buttons: {
      OK: {
        label: "确定",
        className: "btn-primary",
        callback: () => {
          savePreferences();
        }
      },
      cancel: {
        label: "取消",
        className: "btn-info",
        callback: () => {
          void (0);
        }
      }
    },
  });
}

function savePreferences() {
  try {
    // 获取配置文件
    let confObj = naotuConf.getModel();

    // 修改配置项：是否保存日志到磁盘
    confObj.ifSaveLogToDisk = bootbox.NAOTU_CONFIG.ifSaveLogToDisk;

    // 保存配置文件
    naotuConf.save(confObj);
  } catch (ex) {
    logger.error(ex);
  }
}