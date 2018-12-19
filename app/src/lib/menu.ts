import { I18n } from "../core/i18n";
import { remote } from "electron";
import { naotuConf } from "../core/conf";
import { openRecently, clearRecently, autoSave } from "./recently";
import {
  openDialog,
  saveDialog,
  saveAsDialog,
  exportDialog,
  setSavePath
} from "./dialog";
import {
  openFileInFolder,
  maxwin,
  minwin,
  newDialog,
  closeFile,
  cloneFile
} from "./window";
import { exitApp, license, about, checkVersion } from "./help";
import { undo, redo } from "./edit";

class NaotuMenu {
  constructor() {}

  render() {
    const template = new Array<Electron.MenuItemConstructorOptions>();
    let recentListMenu = new Array<Electron.MenuItemConstructorOptions>();

    let conf = naotuConf.getModel();
    if (conf.recently) {
      let maxNum = conf.recentMaxNum || 5;

      // 最近打开文件列表
      for (let i = 0; i < Math.min(conf.recently.length, maxNum); i++) {
        const item = conf.recently[i];
        recentListMenu.push({
          label: item.path,
          click: openRecently
        });
      }

      // 加入清除菜单
      recentListMenu.push({ type: "separator" });
      recentListMenu.push({
        label: I18n.__("miClearRecent"),
        click: clearRecently
      });
    }

    // 文件
    template.push({
      label: I18n.__("mFile"), // 文件
      submenu: [
        {
          label: I18n.__("miNewFile"), // 新建文件
          accelerator: "CmdOrCtrl+N",
          click: newDialog
        },
        {
          label: I18n.__("miOpenFile"), // 打开文件
          accelerator: "CmdOrCtrl+O",
          click: openDialog
        },
        {
          label: I18n.__("miCloseFile"), // 关闭
          accelerator: "CmdOrCtrl+W",
          click: closeFile
        },
        {
          label: I18n.__("miCloneFile"), // 生成副本
          accelerator: "CmdOrCtrl+Shift+N",
          click: cloneFile
        },
        { type: "separator" },
        {
          label: I18n.__("miOpenFolder"), // 打开文件夹
          accelerator: "CmdOrCtrl+Shift+O",
          click: openFileInFolder
        },
        {
          label: I18n.__("miOpenRecent"), // 打开最近的文件
          submenu: recentListMenu
        },
        { type: "separator" },
        {
          label: I18n.__("miSave"), // 保存
          accelerator: "CmdOrCtrl+S",
          click: saveDialog
        },
        {
          label: I18n.__("miSaveAs"), // 另存为
          accelerator: "CmdOrCtrl+Shift+S",
          click: saveAsDialog
        },
        {
          label: I18n.__("miExport"), // 导出
          accelerator: "CmdOrCtrl+E",
          click: exportDialog
        },
        { type: "separator" },
        {
          label: I18n.__("miAutoSave"), // 自动保存
          type: "checkbox",
          // 基于配置文件
          checked: conf.isAutoSave,
          click: autoSave
        },
        {
          label: I18n.__("miSavePath"), // 重选自动保存的目录
          accelerator: "CmdOrCtrl+R",
          click: setSavePath
        },
        { type: "separator" },
        {
          label: I18n.__("miExit"), // 退出
          accelerator: "CmdOrCtrl+Q",
          click: exitApp
        }
      ]
    });

    // 编辑
    template.push({
      label: I18n.__("mEdit"), // 编辑
      submenu: [
        {
          label: I18n.__("miUndo"), // 撤销
          accelerator: "CmdOrCtrl+Z",
          click: undo
        },
        {
          label: I18n.__("miRedo"), // 重做
          accelerator: "CmdOrCtrl+Y",
          click: redo
        },
        { type: "separator" },
        {
          label: I18n.__("miCut"), // 剪切
          accelerator: "CmdOrCtrl+X",
          role: "cut"
        },
        {
          label: I18n.__("miCopy"), // 复制
          accelerator: "CmdOrCtrl+C",
          role: "copy"
        },
        {
          label: I18n.__("miPaste"), // 粘贴
          accelerator: "CmdOrCtrl+V",
          role: "paste"
        }
      ]
    });

    // 窗口
    template.push({
      label: I18n.__("mWindow"), // 窗口
      submenu: [
        {
          label: I18n.__("miMaxWin"), // 最大化
          click: maxwin
        },
        {
          label: I18n.__("miMinWin"), // 最小化
          click: minwin
        }
      ]
    });

    // 帮助
    template.push({
      label: I18n.__("mHelp"), // 帮助
      submenu: [
        {
          label: I18n.__("miShortcut"), // 快捷键
          accelerator: "CmdOrCtrl+/"
          // click: shortcut
        },
        { type: "separator" },
        { label: I18n.__("miBackup"), click: license }, // 备份百度脑图到本地
        { label: I18n.__("miCheckVer"), click: checkVersion }, // 检查更新
        { type: "separator" },
        { label: I18n.__("miAbout"), click: about } // 关于
      ]
    });

    // 加载配置文件 -> 加载菜单模板 -> 基于设置对菜单进行更新 -> 显示菜单
    let menu = remote.Menu.buildFromTemplate(template);

    remote.Menu.setApplicationMenu(menu);
  }
}

export let naotuMenu = new NaotuMenu();
