import { MenuEvent } from "./menu-event";
import { ipcMain, Menu } from "electron";
import { ensureItemIds } from "./ensure-item-ids";

type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow,
  event: Electron.Event
) => void;

/**
 * Utility function returning a Click event handler which, when invoked, emits
 * the provided menu event over IPC.
 */
function emit(name: MenuEvent): ClickHandler {
  return (menuItem, window) => {
    if (window) {
      window.webContents.send("menu-event", { name });
    } else {
      ipcMain.emit("menu-event", { name });
    }
  };
}

export function buildDefaultMenu(): Electron.Menu {
  const template = new Array<Electron.MenuItemConstructorOptions>();

  // 文件
  template.push({
    id: "mFile",
    submenu: [
      {
        id: "miNewFile",
        accelerator: "CmdOrCtrl+N",
        click: emit("newDialog")
      },
      {
        id: "miOpenFile",
        accelerator: "CmdOrCtrl+O",
        click: emit("openDialog")
      },
      {
        id: "miOpenWindow",
        accelerator: "CmdOrCtrl+Shift+N",
        click: emit("openWindow")
      },
      { type: "separator" },
      {
        id: "miOpenFolder",
        accelerator: "CmdOrCtrl+Shift+O",
        click: emit("openFileInFolder")
      },
      {
        id: "miOpenRecent",
        submenu: [
          { type: "separator" },
          {
            id: "miClearRecent",
            click: emit("clearRecently")
          }
        ]
      },
      { type: "separator" },
      {
        id: "miSave",
        accelerator: "CmdOrCtrl+S",
        click: emit("saveDialog")
      },
      {
        id: "miSaveAs",
        accelerator: "CmdOrCtrl+Shift+S",
        click: emit("saveAsDialog")
      },
      {
        id: "miExport",
        accelerator: "CmdOrCtrl+E",
        click: emit("exportDialog")
      },
      { type: "separator" },
      {
        id: "miAutoSave",
        type: "checkbox",
        checked: true,
        click: emit("autoSave")
      },
      {
        id: "miSavePath",
        accelerator: "CmdOrCtrl+R",
        click: emit("setSavePath")
      },
      { type: "separator" },
      {
        id: "miExit",
        accelerator: "CmdOrCtrl+Q",
        click: emit("exitApp")
      }
    ]
  });

  // 编辑
  template.push({
    id: "mEdit",
    submenu: [
      {
        id: "miUndo",
        accelerator: "CmdOrCtrl+Z",
        click: emit("undo")
      },
      {
        id: "miRedo",
        accelerator: "CmdOrCtrl+Y",
        click: emit("redo")
      },
      { type: "separator" },
      {
        id: "miCut",
        accelerator: "CmdOrCtrl+X",
        role: "cut"
      },
      {
        id: "miCopy",
        accelerator: "CmdOrCtrl+C",
        role: "copy"
      },
      {
        id: "miPaste",
        accelerator: "CmdOrCtrl+V",
        role: "paste"
      }
    ]
  });

  // 窗口
  template.push({
    id: "mWindow",
    submenu: [
      {
        id: "miMaxWin",
        click: emit("maxwin")
      },
      {
        id: "miMinWin",
        click: emit("minwin")
      }
    ]
  });

  // 帮助
  template.push({
    id: "mHelp",
    submenu: [
      {
        id: "miShortcut",
        accelerator: "CmdOrCtrl+/",
        click: emit("shortcut")
      },
      { type: "separator" },
      { id: "miBackup", click: emit("license") },
      { id: "miCheckVer", click: emit("checkVersion") },
      { type: "separator" },
      { id: "miAbout", click: emit("about") }
    ]
  });

  // 确保每个菜单项都有ID
  // 通过id找到对应的 label 显示名称
  ensureItemIds(template);

  return Menu.buildFromTemplate(template);
}
