var defaultPath = null, isSutoSave = true;
var fs = require('fs'),
    { shell } = require('electron'),
    { dialog } = require('electron').remote,
    { app } = require('electron').remote,
    { BrowserWindow } = require('electron').remote,
    ver = require('../version'),
    http = require('http');

function readFile(fileName) {
    if (!fileName) return;

    defaultPath = fileName;

    fs.readFile(fileName, 'utf8', function (err, data) {
        var json = JSON.parse(data);
        editor.minder.importJson(json);
    });
}

function writeFile(fileName, content) {
    if (!fileName) return;

    fs.writeFile(fileName, content, function (err) {
        if (err) {
            alert("An error ocurred creating the file " + err.message)
        }
    });
}

function newDialog() {
    if (hasData()) {
        if (confirm('新建文件会覆盖当前文件，是否继续？')) {
            initRoot();
        }
    } else {
        initRoot();
    }
}

function hasData() {
    var nodes = editor.minder.getAllNode().length;
    var rootText = editor.minder.getRoot().data.text;

    return nodes != 1 || rootText != '中心主题';
}

function initRoot() {
    defaultPath = null;
    editor.minder.importJson({ "root": { "data": { "text": "中心主题" } }, "template": "filetree", "theme": "fresh-blue" });
    editor.minder.select(minder.getRoot(), true);
}

function autoSave(obj) {
    isSutoSave = obj.checked;
}

function openDialog() {
    dialog.showOpenDialog(
        { filters: [{ name: 'KityMinder', extensions: ['km'] }] },
        (fileName) => {
            if (!fileName) { return; }

            readFile(fileName[0]);
        }
    );
}

function saveDialog() {
    if (defaultPath) {
        var json = editor.minder.exportJson();
        var data = JSON.stringify(editor.minder.exportJson());
        writeFile(defaultPath, data);

    } else { saveAsDialog(); }
}

function saveAsDialog() {
    dialog.showSaveDialog(
        {
            title: "保存 KityMinder 文件",
            defaultPath: defaultPath,
            filters: [{ name: 'KityMinder', extensions: ['km'] }]
        },
        (fileName) => {
            if (!fileName) { return; }// cancel save

            defaultPath = fileName;

            var json = editor.minder.exportJson();
            var data = JSON.stringify(editor.minder.exportJson());
            writeFile(fileName, data);
        }
    );
}

function exportDialog() {
    var filters = [];
    var pool = kityminder.data.getRegisterProtocol();
    for (var name in pool) {
        if (pool.hasOwnProperty(name) && pool[name].encode) {
            filters.push({ name: pool[name].fileDescription, extensions: [pool[name].fileExtension.replace('.', '')] });
        }
    }

    dialog.showSaveDialog(
        {
            title: "导出 KityMinder 文件",
            filters: filters
        },
        (fileName) => {
            if (!fileName) { return; }// cancel export

            var ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
            var protocol = null;
            var pool = kityminder.data.getRegisterProtocol();
            for (var name in pool) {
                if (pool.hasOwnProperty(name) && pool[name].encode) {
                    if (pool[name].fileExtension === ext) {
                        protocol = pool[name];
                        break;
                    }
                }
            }

            exportFile(protocol, fileName)
        }
    );
}

function exitApp() {
    app.quit();
}

function redo() {
    editor.history.redo();
}

function undo() {
    editor.history.undo();
}

function cut() {
    minder.execCommand('Cut');
}

function copy() {
    minder.execCommand('Copy');
}

function paste() {
    minder.execCommand('Paste');
}

function maxwin() {
    BrowserWindow.getAllWindows()[0].maximize();
}

function minwin() {
    BrowserWindow.getAllWindows()[0].minimize();
}

function license() {
    shell.openExternal("https://github.com/topcss/DesktopNaotu")
}

function checkVersion() {
    $.get('https://raw.githubusercontent.com/topcss/DesktopNaotu/master/version.js', function (data) {

        var newVer = data.substring(19, data.lastIndexOf(','));
        var oldVer = ver.version.slice(0, 3).join(', ');

        if (newVer != oldVer) {
            alert('检测到新版本，请下载新版本。');
            shell.openExternal("https://github.com/topcss/DesktopNaotu");
        } else {
            alert('当前没有可用的更新。');
        }

    });
}

function about() {
    var text = `
Copyright (c) 2017 Jack

版本： v${ver.version.join('.')}
QQ 讨论群：330722928
需要下载百度脑图文件，请点击：查看帮助
    `;
    dialog.showMessageBox({ type: "info", title: "桌面版脑图", message: text, buttons: ["OK"] });
}

function shortcut() {
    var shortcutKeys = [
        {
            groupName: '节点操作',
            groupItem: [
                { key: "Enter", desc: " 插入兄弟节点" },
                { key: "Tab, Insert", desc: " 插入子节点" },
                { key: "Shift + Tab", desc: " 插入父节点" },
                { key: "Delete", desc: " 删除节点" },
                { key: "Up, Down, Left, Right", desc: " 节点导航" },
                { key: "Alt + Up, Down", desc: " 向上/向下调整顺序" },
                { key: "/", desc: " 展开/收起节点" },
                { key: "F2", desc: " 编辑节点" },
                { key: "Shift + Enter", desc: " 文本换行" },
                { key: "Ctrl + A", desc: " 全选节点" },
                { key: "Ctrl + C", desc: " 复制节点" },
                { key: "Ctrl + X", desc: " 剪切节点" },
                { key: "Ctrl + V", desc: " 粘贴节点" },
                { key: "Ctrl + B", desc: " 加粗" },
                { key: "Ctrl + I", desc: " 斜体" },
                { key: "Ctrl + F", desc: " 查找节点" }
            ]
        }, {
            groupName: '视野控制',
            groupItem: [
                //{ key:"Ctrl + ESC",desc:" 全屏切换"},
                { key: "Alt + 拖动, 右键拖动", desc: " 拖动视野" },
                { key: "滚轮, 触摸板", desc: " 移动视野" },
                //{ key:"Ctrl + Up, Down, Left, Right",desc:" 视野导航"},
                { key: "空白处双击, Ctrl + Enter", desc: " 居中根节点" },
                { key: "Ctrl + +, -", desc: " 放大/缩小视野" }
            ]
        }, {
            groupName: '文件操作',
            groupItem: [
                { key: "Ctrl + O", desc: " 打开" },
                { key: "Ctrl + S", desc: " 保存" },
                { key: "Ctrl + Shift + S", desc: " 另存为" },
                // { key: "Ctrl + Alt + S", desc: " 分享" }
            ]
        }, {
            groupName: '布局',
            groupItem: [
                { key: "Ctrl + Shift + L", desc: " 整理布局" }
            ]
        }, {
            groupName: '后悔药',
            groupItem: [
                { key: "Ctrl + Z", desc: " 撤销" },
                { key: "Ctrl + Y", desc: " 重做" }
            ]
        }
    ];

    var text = "";
    for (var i = 0; i < shortcutKeys.length; i++) {
        var group = shortcutKeys[i];
        text += `\n` + group.groupName + `\n`;
        for (var j = 0; j < group.groupItem.length; j++) {
            var item = group.groupItem[j];
            text += `       ` + item.desc + `   ` + item.key + `\n`;
        }
    }

    dialog.showMessageBox({ type: "none", title: "快捷键", message: text, buttons: ["OK"] });
}

function exportFile(protocol, filename) {
    var options = {
        download: true,
        filename: filename
    };

    minder.exportData(protocol.name, options).then(function (data) {
        switch (protocol.dataType) {
            case 'text':
                writeFile(filename, data);
                break;
            case 'base64':
                var base64Data = data.replace(/^data:image\/\w+;base64,/, "");
                var dataBuffer = new Buffer(base64Data, 'base64');

                writeFile(filename, dataBuffer);
                break;
            case 'blob':
                break;
        }

        return null;
    });
}