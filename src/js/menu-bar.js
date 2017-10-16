var remote = require('electron').remote;
var Menu = remote.Menu;

var template = [{
    label: '文件(&F)',
    submenu: [
        {
            label: '新建文件(&N)',
            accelerator: 'CmdOrCtrl+N',
            click: newDialog
        },
        {
            label: '打开文件(&O)',
            accelerator: 'CmdOrCtrl+O',
            click: openDialog
        },
        { type: 'separator' },
        {
            label: '保存(&S)',
            accelerator: 'CmdOrCtrl+S',
            click: saveDialog
        },
        {
            label: '另存为(&A)...',
            accelerator: 'CmdOrCtrl+Shift+S',
            click: saveAsDialog
        },
        {
            label: '导出(&E)...',
            accelerator: 'CmdOrCtrl+E',
            click: exportDialog
        },
        { type: 'separator' },
        {
            label: '自动保存',
            type: 'checkbox',
            checked: true,
            click: autoSave
        },
        { type: 'separator' },
        {
            label: '退出(&X)',
            click: exitApp
        }
    ]
}, {
    label: "编辑(&E)",
    submenu: [
        {
            label: "撤销(&U)",
            accelerator: 'CmdOrCtrl+Z',
            click: undo
        },
        {
            label: "恢复(&R)",
            accelerator: 'CmdOrCtrl+Y',
            click: redo
        }
    ]
}, {
    label: "帮助(&H)",
    submenu: [
        {
            label: '快捷键(&H)...',
            accelerator: 'CmdOrCtrl+/',
            click: shortcut
        },
        { type: 'separator' },
        { label: "查看帮助(&V)", click: license },
        { label: "检查更新...(&N)", click: checkVersion },
        { type: 'separator' },
        { label: "关于(&A)", click: about }
    ]
}];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
