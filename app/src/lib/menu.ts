import { I18n } from "../core/i18n";
import { remote } from "electron";
import { naotuConf } from "../core/conf";
import { openRecently, clearRecently } from "./recently";
import {
  openDialog,
  saveDialog,
  saveAsDialog,
  exportDialog,
  setSavePath
} from "./dialog";
import {
  openWindow,
  openFileInFolder,
  maxwin,
  minwin,
  newDialog
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
      // 最近打开文件列表
      conf.recently.forEach(path => {
        recentListMenu.push({
          label: path,
          click: openRecently
        });
      });

      // 清除菜单
      recentListMenu.push({ type: "separator" });
      recentListMenu.push({
        label: I18n.__("miClearRecent"),
        click: clearRecently
      });
    }

    // 文件
    template.push({
      label: I18n.__("mFile"),
      submenu: [
        {
          label: I18n.__("miNewFile"),
          accelerator: "CmdOrCtrl+N",
          click: newDialog
        },
        {
          label: I18n.__("miOpenFile"),
          accelerator: "CmdOrCtrl+O",
          click: openDialog
        },
        {
          label: I18n.__("miOpenWindow"),
          accelerator: "CmdOrCtrl+Shift+N",
          click: openWindow
        },
        { type: "separator" },
        {
          label: I18n.__("miOpenFolder"),
          accelerator: "CmdOrCtrl+Shift+O",
          click: openFileInFolder
        },
        {
          label: I18n.__("miOpenRecent"),
          submenu: recentListMenu
        },
        { type: "separator" },
        {
          label: I18n.__("miSave"),
          accelerator: "CmdOrCtrl+S",
          click: saveDialog
        },
        {
          label: I18n.__("miSaveAs"),
          accelerator: "CmdOrCtrl+Shift+S",
          click: saveAsDialog
        },
        {
          label: I18n.__("miExport"),
          accelerator: "CmdOrCtrl+E",
          click: exportDialog
        },
        { type: "separator" },
        {
          label: I18n.__("miAutoSave"),
          type: "checkbox",
          // 基于配置文件
          checked: conf.isAutoSave
          // click: autoSave
        },
        {
          label: I18n.__("miSavePath"),
          accelerator: "CmdOrCtrl+R",
          click: setSavePath
        },
        { type: "separator" },
        {
          label: I18n.__("miExit"),
          accelerator: "CmdOrCtrl+Q",
          click: exitApp
        }
      ]
    });

    // 编辑
    template.push({
      label: I18n.__("mEdit"),
      submenu: [
        {
          label: I18n.__("miUndo"),
          accelerator: "CmdOrCtrl+Z",
          click: undo
        },
        {
          label: I18n.__("miRedo"),
          accelerator: "CmdOrCtrl+Y",
          click: redo
        },
        { type: "separator" },
        {
          label: I18n.__("miCut"),
          accelerator: "CmdOrCtrl+X",
          role: "cut"
        },
        {
          label: I18n.__("miCopy"),
          accelerator: "CmdOrCtrl+C",
          role: "copy"
        },
        {
          label: I18n.__("miPaste"),
          accelerator: "CmdOrCtrl+V",
          role: "paste"
        }
      ]
    });

    // 窗口
    template.push({
      label: I18n.__("mWindow"),
      submenu: [
        {
          label: I18n.__("miMaxWin"),
          click: maxwin
        },
        {
          label: I18n.__("miMinWin"),
          click: minwin
        }
      ]
    });

    // 帮助
    template.push({
      label: I18n.__("mHelp"),
      submenu: [
        {
          label: I18n.__("miShortcut"),
          accelerator: "CmdOrCtrl+/"
          // click: shortcut
        },
        { type: "separator" },
        { label: I18n.__("miBackup"), click: license },
        { label: I18n.__("miCheckVer"), click: checkVersion },
        { type: "separator" },
        { label: I18n.__("miAbout"), click: about }
      ]
    });

    // 加载配置文件 -> 加载菜单模板 -> 基于设置对菜单进行更新 -> 显示菜单
    let menu = remote.Menu.buildFromTemplate(template);

    remote.Menu.setApplicationMenu(menu);
  }
}

export let naotuMenu = new NaotuMenu();
