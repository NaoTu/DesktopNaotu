import { ipcRenderer } from "electron";
import { MenuEvent } from "../menu/menu-event";
import { func } from "./func";
import { logger } from "../core/logger";

interface IMenu {
  /**
   * 清空历史记录的列表
   */
  clearRecently(): void;

  /**
   * 渲染菜单
   */
  render(): void;

  /**
   * 设置菜单
   */
  setMenus(): void;
}

export class NaotuMenu {
  constructor() {}

  /**
   * event-Listenner
   */
  public Start() {
    logger.info("Naotu menu start event listener");
    
    // 设置监听
    ipcRenderer.on(
      "menu-event",
      (event: Electron.IpcMessageEvent, { name }: { name: MenuEvent }) => {
        this.onMenuEvent(name);
      }
    );
  }

  private onMenuEvent(name: MenuEvent): any {
    switch (name) {
      case "openDialog":
        func.openDialog();
        break;
      case "saveAsDialog":
        func.saveAsDialog();
        break;
      case "newDialog":
        func.newDialog();
        break;
      case "openWindow":
        func.openWindow();
        break;
      case "openFileInFolder":
        func.openFileInFolder();
        break;
      case "setSavePath":
        func.setSavePath();
        break;
      case "exportDialog":
        func.exportDialog();
        break;
      case "exitApp":
        func.exitApp();
        break;
      case "redo":
        func.redo();
        break;
      case "undo":
        func.undo();
        break;
      case "maxwin":
        func.maxwin();
        break;
      case "minwin":
        func.minwin();
        break;
      case "license":
        func.license();
        break;
      case "about":
        func.about();
        break;
    }
  }
}
