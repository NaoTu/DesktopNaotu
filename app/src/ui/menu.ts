import { I18n } from "../core/i18n";
import { app, BrowserWindow, Menu, MenuItem } from "electron";
import { naotuConf } from "../core/conf";

class NaotuMenu {
  constructor() { }

  getRecentListTemplate() {
    let recentListMenu = [];

    let conf = naotuConf.getModel();
    if (conf.recently) {
      let maxNum = conf.recentMaxNum || 5;

      // 最近打开文件列表
      for (let i = 0; i < Math.min(conf.recently.length, maxNum); i++) {
        const item = conf.recently[i];
        recentListMenu.push({
          label: item.path,
          click: this.menuClick('openRecently')
        });
      }

      // 加入清除菜单
      recentListMenu.push({ type: "separator" });
      recentListMenu.push({
        label: I18n.__("miClearRecent"),
        click: this.menuClick('clearRecently')
      });
    }

    return recentListMenu;
  }

  getInitTemplate() {
    const isMac = process.platform === 'darwin';
    let conf = naotuConf.getModel();

    let template = [];
    
    template.push(
      // { role: 'appMenu' }
      ...(isMac ? [{
        label: app.name,
        submenu: [
          { 
            label: I18n.__("miAbout"), 
            role: 'about' 
          },
          { type: 'separator' },
          {
            label: I18n.__("miPreferences"), // 打开偏好设置
            click: this.menuClick('preferencesDialog')
          },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }] : []),
      // { role: 'fileMenu' }
      {
        label: I18n.__("mFile"),
        submenu: [
          {
            label: I18n.__("miNewFile"),
            accelerator: "CmdOrCtrl+N",
            click: this.menuClick('newFile')
          },
          {
            label: I18n.__("miOpenWindow"),
            accelerator: "CmdOrCtrl+Shift+N",
            click: this.menuClick('newDialog')
          },
          {
            label: I18n.__("miOpenFile"),
            accelerator: "CmdOrCtrl+O",
            click: this.menuClick('openDialog')
          },
          {
            label: I18n.__("miCloseFile"),
            accelerator: "CmdOrCtrl+W",
            click: this.menuClick('closeFile')
          },
          {
            label: I18n.__("miCloneFile"),
            accelerator: "CmdOrCtrl+Alt+N",
            click: this.menuClick('cloneFile')
          },
          { type: "separator" },
          {
            label: I18n.__("miOpenFolder"),
            accelerator: "CmdOrCtrl+Shift+O",
            click: this.menuClick('openFileInFolder')
          },
          {
            label: I18n.__("miOpenRecent"), // recent file list
            submenu: this.getRecentListTemplate()
          },
          { type: "separator" },
          {
            label: I18n.__("miSave"),
            accelerator: "CmdOrCtrl+S",
            click: this.menuClick('saveDialog')
          },
          {
            label: I18n.__("miSaveAs"),
            accelerator: "CmdOrCtrl+Shift+S",
            click: this.menuClick('saveAsDialog')
          },
          {
            label: I18n.__("miExport"),
            accelerator: "CmdOrCtrl+E",
            click: this.menuClick('exportDialog')
          },
          { type: "separator" },
          {
            label: I18n.__("miAutoSave"),
            type: "checkbox",
            // 基于配置文件
            checked: conf.isAutoSave,
            click: this.menuClick('autoSave')
          },
          {
            label: I18n.__("miSavePath"), // AutoSave Directory
            accelerator: "CmdOrCtrl+R",
            click: this.menuClick('setSavePath')
          },
          ...(!isMac ?
            [{ type: "separator" },
            { role: 'close' }
          ] : [])
        ]
      },
      // { role: 'editMenu' }
      {
        label: I18n.__("mEdit"), // 编辑
        submenu: [
          {
            label: I18n.__("miUndo"), // 撤销
            accelerator: "CmdOrCtrl+Z",
            click: this.menuClick('undo')
          },
          {
            label: I18n.__("miRedo"), // 重做
            accelerator: "CmdOrCtrl+Y",
            click: this.menuClick('redo')
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
      },
      // { role: 'customizeMenu' }
      ...(!isMac ? [
        {
          label: I18n.__("mCustomize"), // 设置
          submenu: [
            {
              label: I18n.__("miPreferences"), // 打开偏好设置
              click: this.menuClick('preferencesDialog')
            }
          ]
        }
      ] : []),
      // { role: 'windowMenu' }
      {
        label: I18n.__("mWindow"),
        submenu: [
          { 
            label: I18n.__("miMinWin"),
            role: 'minimize' 
          },
          { role: 'zoom' },
          ...(isMac ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ] : []),
          { type: 'separator' },
          { 
            label: I18n.__("miToggleDevTools"),
            role: 'toggledevtools' 
          },
        ]
      },
      {
        label: I18n.__("mHelp"),
        role: 'help',
        submenu: [
          {
            label: I18n.__("miShortcut"), // 快捷键
            accelerator: "CmdOrCtrl+/",
            click: this.menuClick('shortcutDialog')
          },
          { type: "separator" },
          { label: I18n.__("miBackup"), click: this.menuClick('license') }, // 备份百度脑图到本地
          { label: I18n.__("miCheckVer"), click: this.menuClick('checkVersion') }, // 检查更新
          ...(!isMac ? [
            { type: "separator" },
            { label: I18n.__("miAbout"), click: this.menuClick('about') }
          ] : [])
        ]
      }
    );
    
    return template;
  }

  menuClick(name: string) {
    return function(menuItem: MenuItem, browserWindow: BrowserWindow, event: KeyboardEvent) {
      switch (name) {
        case 'd': break;
        default: 
          let obj = {
            name: name,
            menu: menuItem.label
          };
          console.log(obj);
          BrowserWindow.getFocusedWindow()?.webContents.send('menu-click', JSON.stringify(obj));
      }
    }
  }

  getMenu() {
    return Menu.buildFromTemplate(this.getInitTemplate());
  }
}

export let naotuMenu = new NaotuMenu();
