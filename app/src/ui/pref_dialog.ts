import { I18n } from "../core/i18n";
import { naotuConf } from "../core/conf";
import { readText } from "../core/io";
import { getLogDirectoryPath } from "../core/path";
import { logger } from "../core/logger";
let ejs = require("ejs") || null;   // 由于@types/ejs不兼容，目前暂时无法使用import语句


export function preferencesDialog() {
  // 如果对话框已弹出，则直接返回
  // Bootbox不会清理嵌入到对话框的JavaScript定义，
  // 这会导致再次弹出对话框时，对话框的交互功能失效，除非用户手动关闭对话框再打开
  if (jQuery(".bootbox").length > 0) {
    logger.info("Preference dialog had been already poped up. Ignoring.");
    return;
  }

  // 借助全局的bootbox对象传递配置数据
  // 直接给前端的对象添加成员，即可实现前后端交换数据，而无需IPC通信
  let conf = naotuConf.getModel();
  bootbox.NAOTU_CONFIG = conf;
  bootbox.NAOTU_LOG_PATH = getLogDirectoryPath();

  // 用EJS渲染多语言界面
  let dialogContent = ejs.render(
    readText(`${__dirname}/pref_dialog.seg.html`),
    {
      dPreferences_Log: I18n.__("dPreferences_Log"),
      dPreferences_Log_Switch: I18n.__("dPreferences_Log_Switch"),
      dPreferences_Log_TakeEffect: I18n.__("dPreferences_Log_TakeEffect"),
      dPreferences_Log_SaveLogToDisk: I18n.__("dPreferences_Log_SaveLogToDisk"),
      dPreferences_Log_Operations: I18n.__("dPreferences_Log_Operations"),
      dPreferences_Log_Cleanup: I18n.__("dPreferences_Log_Cleanup"),
      dPreferences_Log_OpenLogDir: I18n.__("dPreferences_Log_OpenLogDir"),
      dPreferences_Log_Info_NotGenerated: I18n.__("dPreferences_Log_Info_NotGenerated"),
      dPreferences_Log_Info_LogCleanError: I18n.__("dPreferences_Log_Info_LogCleanError"),
      dPreferences_Log_Info_LogCleaned: I18n.__("dPreferences_Log_Info_LogCleaned"),
      dPreferences_Log_Info_NodeJsLimits: I18n.__("dPreferences_Log_Info_NodeJsLimits")
    }
  )

  bootbox.dialog({
    title: I18n.__("dPreferences"),
    message: dialogContent,
    size: "large",
    onEscape: true,
    // scrollable: true,
    buttons: {
      OK: {
        label: I18n.__("cOK"),
        className: "btn-primary",
        callback: () => {
          savePreferences();
        }
      },
      cancel: {
        label: I18n.__("cCancel"),
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