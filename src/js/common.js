var defaultPath = null, isSutoSave = true;
var fs = require('fs'),
    { shell } = require('electron'),
    { dialog, Menu } = require('electron').remote,
    { app } = require('electron').remote,
    { BrowserWindow, Menu, MenuItem } = require('electron').remote,
    ver = require('../version'),
    http = require('http'),
    path = require('path');

const log4js = require('log4js');
log4js.configure({
    appenders: {
        everything: { type: 'dateFile', filename:  getUserDataDir() + '/logs/naotu', pattern: '.yyyy-MM-dd-hh.log', compress: true ,alwaysIncludePattern:true}
    },
    categories: {
    default: { appenders: [ 'everything' ], level: 'debug'}
    }
});
const logger = log4js.getLogger('everything');
var confPath = path.join(getUserDataDir(), '/naotu.config.json');

$(function () {
    bootbox.setLocale("zh_CN");

    // 欢迎语
    logger.info('Jack welcomes you!');

    try {
        // 若没有用户文件夹，则创建
        var defFolder = path.join(getUserDataDir(), '/');
        if (!fs.existsSync(defFolder)) {
            fs.mkdirSync(defFolder);
        }

        // 检查或创建配置文件
        fs.exists(confPath, function (exists) {
            if(!exists){
                fs.writeFileSync(confPath, JSON.stringify(getDefConf()));
            }
        });
    } catch (ex) {
        logger.error(ex);
    }
});

// 重选自动保存的目录
function setSavePath() {
    try {
        
        var defPath = getUserDataDir();
        var confObj = JSON.parse(fs.readFileSync(confPath));
        defPath = confObj.defSavePath;

        dialog.showOpenDialog({properties: ['openDirectory'], defaultPath : defPath}, function (filenames) {
            if (filenames && filenames.length > 0) { 
                confObj.defSavePath = filenames[0];

                fs.writeFileSync(confPath, JSON.stringify(confObj));
            }
        });

    } catch (ex) {
        logger.error(ex);
    }
}

function readFile(fileName) {
    if (!fileName) return;

    logger.info('打开文件 路径是：' + fileName);

    defaultPath = fileName;

    fs.readFile(fileName, 'utf8', function (err, data) {
        
        logger.info('打开文件 内容是：' + data);

        var json = JSON.parse(data);
        editor.minder.importJson(json);

        showFileName(fileName);
    });

    saveRecords(defaultPath);
}

function writeFile(fileName, content, isExport) {
    if (!fileName) return;

    logger.info('保存文件 路径为：' + fileName);
    logger.info('保存文件 内容是：' + content);

    fs.writeFile(fileName, content, function (err) {
        if (err) {
            logger.error("An error ocurred creating the file " + err.message)
        } else {
            showFileName(fileName);
        }
    });

    if(!isExport){
        saveRecords(fileName);
    }
}

function newDialog() {
    logger.info('新建文件');

    if (hasData()) {
        bootbox.confirm({
            message: '新建文件会关闭当前文件，是否继续？',
            callback: function (result) {
                if (result) {
                    initRoot();
                }
            }
        });
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
    getAppInstance().setTitle('桌面版脑图');
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

function openFileInFolder() {
    if (defaultPath != null) {
        shell.showItemInFolder(defaultPath);
    } else {
        bootbox.alert("您当前还未打开任何文件。");
    }
}

function saveDialog() {
    if (!defaultPath) {
        defaultPath = getDefaultPath();
    }

    var json = editor.minder.exportJson();
    var data = JSON.stringify(editor.minder.exportJson());
    writeFile(defaultPath, data);
}

function saveAsDialog() {
    var newPath = path.join(getUserDataDir(), '/' + minder.getRoot().data.text + '.km');

    dialog.showSaveDialog(
        {
            title: "保存 KityMinder 文件",
            defaultPath: newPath,
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
    var newPath = path.join(getUserDataDir(), '/' + minder.getRoot().data.text);

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
            defaultPath: newPath,
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
    logger.info('exit successfully!');

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
    getAppInstance().maximize();
}

function minwin() {
    getAppInstance().minimize();
}

function license() {
    shell.openExternal("https://github.com/NaoTu/DesktopNaotu")
}

function checkVersion() {
    logger.info('检查是否有新版本发布');

    $.get('https://raw.githubusercontent.com/NaoTu/DesktopNaotu/master/version.js', function (data) {

        var newVer = data.substring(19, data.lastIndexOf(','));
        var oldVer = ver.version.slice(0, 3).join(', ');

        if (newVer != oldVer) {
            bootbox.alert('检测到新版本，请下载新版本。');
            shell.openExternal("https://github.com/NaoTu/DesktopNaotu");
        } else {
            bootbox.alert('当前没有可用的更新。');
        }

    });
}

function about() {
    var text = `
Copyright (c) 2018 Jack

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
                writeFile(filename, data, true);
                break;
            case 'base64':
                var base64Data = data.replace(/^data:image\/\w+;base64,/, "");
                var dataBuffer = new Buffer(base64Data, 'base64');

                writeFile(filename, dataBuffer, true);
                break;
            case 'blob':
                break;
        }

        return null;
    });
}

function getDefaultPath() {
    try {
        var time = new Date().format("yyyy-MM-dd_hhmmss");

        var confObj = JSON.parse(fs.readFileSync(confPath));
        var defPath = confObj.defSavePath || getUserDataDir();
        
        // 若没有用户文件夹，则创建
        fs.exists(defPath, (exists) => {
            if (!exists) {
                fs.mkdir(defPath)
            }
        });

        var filePath = path.join(defPath, '/' + time + '.km');
        logger.info('getDefaultPath ' + filePath);

        return filePath;
    } catch (ex) {
        logger.error(ex);
    }
}

function getUserDataDir() {
    return (app || remote.app).getPath('userData');
}

function showFileName(fileName) {
    if (fileName != undefined) {
        var index = fileName.lastIndexOf('\\') > -1 ? fileName.lastIndexOf('\\') : fileName.lastIndexOf('/');
        var title = fileName.substring(index + 1) + ' - 桌面版脑图';

        getAppInstance().setTitle(title);
    }
}

function getAppInstance() {
    return BrowserWindow.getAllWindows()[0];
}

function getDefConf(){
    return {
        'defSavePath': getUserDataDir(),
        'recently': []
    };
}

function clearRecently() {
    try {
        // 读取配置文件
        var confObj = JSON.parse(fs.readFileSync(confPath));
        if(confObj != null){
            // 清空历史记录的列表
            confObj.recently = [];

            fs.writeFileSync(confPath, JSON.stringify(confObj));
        } else {
            // 读失败了，则创建一个默认的配置文件
            fs.writeFileSync(confPath, JSON.stringify(getDefConf()));
        }

        // 更新菜单
        updateMenus();
    } catch (ex) {
        logger.error(ex);
    }
};

function saveRecords(filePath) {
    var time = new Date().format("yyyy-MM-dd hh:mm:ss");

    fs.exists(confPath, function (exists) {
        if (!exists) {// 不存在，则创建
            var confObj = getDefConf();
            confObj.recently.push({ 'time': time, 'path': filePath });

            fs.writeFileSync(confPath, JSON.stringify(confObj));
        } else {// 存在，则读取
            var confObj = JSON.parse(fs.readFileSync(confPath));
            var list = confObj.recently;

            // 查重
            var items = [], selected = null;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.path == filePath) {
                    selected = item;
                } else {
                    items.push(item);
                }
            }

            if (selected == null) {
                items.splice(0, 0, { 'time': time, 'path': filePath });
            } else {// 在原来的清单中，则更新
                selected.time = time;
                items.splice(0, 0, selected);
            }

            confObj.recently = items;

            // 更新列表
            fs.writeFileSync(confPath, JSON.stringify(confObj));
        }
    });

    // 更新菜单
    updateMenus();
}

function updateMenus() {
    fs.exists(confPath, function (exists) {
        if (exists) {// 存在，则读取

            // 深度复制
            var menus = $.extend(true, [], template);

            var confObj = JSON.parse(fs.readFileSync(confPath));
            var list = confObj.recently;

            for (var i = 0; i < Math.min(list.length, 5); i++) {// 只显示最近5次
                var item = list[i];

                // 追加到菜单
                menus[0].submenu[4].submenu.splice(menus[0].submenu[4].submenu.length - 2, 0, {
                    label: item.path,
                    click: openRecently
                });
            }

            // 更新菜单
            var menu = Menu.buildFromTemplate(menus);
            Menu.setApplicationMenu(menu);

        } else {
            var menu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(menu);
        }
    });
}

function openRecently(item) {
    var path = item.label;
    if (path) {
        fs.exists(path, function (result) {
            if (result) {// 存在，则读取
                readFile(path);
            } else {
                bootbox.alert("文件路径不存在");
            }
        });
    }
}