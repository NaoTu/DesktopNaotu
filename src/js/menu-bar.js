var remote = require("electron").remote;
var Menu = remote.Menu;

var template = [
  {
    label: i18n.__("mFile"),
    submenu: [
      {
        label: i18n.__("miNewFile"),
        accelerator: "CmdOrCtrl+N",
        click: newDialog
      },
      {
        label: i18n.__("miOpenFile"),
        accelerator: "CmdOrCtrl+O",
        click: openDialog
      },
      { type: "separator" },
      {
        label: i18n.__("miOpenFolder"),
        accelerator: "CmdOrCtrl+Shift+O",
        click: openFileInFolder
      },
      {
        label: i18n.__("miOpenRecent"),
        submenu: [
          { type: "separator" },
          {
            id: 1,
            label: i18n.__("miClearRecent"),
            click: clearRecently
          }
        ]
      },
      { type: "separator" },
      {
        label: i18n.__("miSave"),
        accelerator: "CmdOrCtrl+S",
        click: saveDialog
      },
      {
        label: i18n.__("miSaveAs"),
        accelerator: "CmdOrCtrl+Shift+S",
        click: saveAsDialog
      },
      {
        label: i18n.__("miExport"),
        accelerator: "CmdOrCtrl+E",
        click: exportDialog
      },
      { type: "separator" },
      {
        label: i18n.__("miAutoSave"),
        type: "checkbox",
        checked: true,
        click: autoSave
      },
      {
        label: i18n.__("miSavePath"),
        accelerator: "CmdOrCtrl+R",
        click: setSavePath
      },
      { type: "separator" },
      {
        label: i18n.__("miExit"),
        click: exitApp
      }
    ]
  },
  {
    label: i18n.__("mEdit"),
    submenu: [
      {
        label: i18n.__("miUndo"),
        accelerator: "CmdOrCtrl+Z",
        click: undo,
        selector: "undo:"
      },
      {
        label: i18n.__("miRedo"),
        accelerator: "CmdOrCtrl+Y",
        click: redo,
        selector: "redo:"
      },
      { type: "separator" },
      {
        label: i18n.__("miCut"),
        accelerator: "CmdOrCtrl+X",
        selector: "cut:",
        role: "cut"
      },
      {
        label: i18n.__("miCopy"),
        accelerator: "CmdOrCtrl+C",
        selector: "copy:",
        role: "copy"
      },
      {
        label: i18n.__("miPaste"),
        accelerator: "CmdOrCtrl+V",
        selector: "paste:",
        role: "paste"
      }
    ]
  },
  {
    label: i18n.__("mWindow"),
    submenu: [
      {
        label: i18n.__("miMaxWin"),
        click: maxwin
      },
      {
        label: i18n.__("miMinWin"),
        click: minwin
      }
    ]
  },
  {
    label: i18n.__("mHelp"),
    submenu: [
      {
        label: i18n.__("miShortcut"),
        accelerator: "CmdOrCtrl+/",
        click: shortcut
      },
      { type: "separator" },
      { label: i18n.__("miBackup"), click: license },
      { label: i18n.__("miCheckVer"), click: checkVersion },
      { type: "separator" },
      { label: i18n.__("miAbout"), click: about }
    ]
  }
];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
