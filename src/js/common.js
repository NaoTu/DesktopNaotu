var defaultPath = null,
  isSutoSave = true,
  fs = require("fs"),
  { remote, globalShortcut, shell, electron } = require("electron"),
  { dialog, Menu, app } = require("electron").remote,
  { BrowserWindow, Menu, MenuItem } = require("electron").remote,
  ver = require("../version"),
  http = require("http"),
  path = require("path"),
  hotkeys = require("hotkeys-js"),
  log4js = require("log4js");

log4js.configure({
  appenders: {
    NaoTuApp: {
      type: "dateFile",
      filename: getUserDataDir() + "/logs/naotu",
      pattern: ".yyyy-MM-dd-hh.log",
      compress: true,
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: ["NaoTuApp"], level: "debug" }
  }
});

const logger = log4js.getLogger("NaoTuApp");
var confPath = path.join(getUserDataDir(), "/naotu.config.json");

// init
$(function() {
  getAppInstance().setTitle(i18n.__("sAppName"));
  bootbox.setLocale("zh_CN");

  // 欢迎语
  logger.info("Jack welcomes you! v" + ver.version.slice(0, 3).join("."));

  try {
    // 若没有用户文件夹，则创建
    var defFolder = path.join(getUserDataDir(), "/");
    if (!fs.existsSync(defFolder)) {
      fs.mkdirSync(defFolder);
    }

    // 检查或创建配置文件
    fs.exists(confPath, function(exists) {
      if (!exists) {
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

    dialog.showOpenDialog(
      { properties: ["openDirectory"], defaultPath: defPath },
      function(filenames) {
        if (filenames && filenames.length > 0) {
          confObj.defSavePath = filenames[0];

          fs.writeFileSync(confPath, JSON.stringify(confObj));
        }
      }
    );
  } catch (ex) {
    logger.error(ex);
  }
}

function readFile(fileName) {
  if (!fileName) return;

  logger.info("打开文件 路径是：" + fileName);

  defaultPath = fileName;

  fs.readFile(fileName, "utf8", function(err, data) {
    logger.info("打开文件 内容是：" + data);

    var json = JSON.parse(data);
    editor.minder.importJson(json);

    showFileName(fileName);
  });

  saveRecords(defaultPath);
}

function writeFile(fileName, content, isExport) {
  if (!fileName) return;

  logger.info("保存文件 路径为：" + fileName);
  logger.info("保存文件 内容是：" + content);

  fs.writeFile(fileName, content, function(err) {
    if (err) {
      logger.error("An error ocurred creating the file " + err.message);
    } else {
      showFileName(fileName);
    }
  });

  if (!isExport) {
    saveRecords(fileName);
  }
}

function newDialog() {
  logger.info("新建文件");

  if (hasData()) {
    bootbox.confirm({
      message: i18n.__("sNewKm"),
      callback: function(result) {
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

  return nodes != 1 || rootText != i18n.__("sMainTopic");
}

function initRoot() {
  defaultPath = null;
  getAppInstance().setTitle(i18n.__("sAppName"));
  editor.minder.importJson({
    root: { data: { text: i18n.__("sMainTopic") } },
    template: "filetree",
    theme: "fresh-blue"
  });
  editor.minder.select(minder.getRoot(), true);
}

function autoSave(obj) {
  isSutoSave = obj.checked;
}

function openDialog() {
  dialog.showOpenDialog(
    { filters: [{ name: "KityMinder", extensions: ["km"] }] },
    function(fileName) {
      if (!fileName) {
        return;
      }

      readFile(fileName[0]);
    }
  );
}

function openFileInFolder() {
  if (defaultPath != null) {
    shell.showItemInFolder(defaultPath);
  } else {
    bootbox.alert(i18n.__("sNoOpenFile"));
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
  var newPath = path.join(
    getUserDataDir(),
    "/" + minder.getRoot().data.text + ".km"
  );

  dialog.showSaveDialog(
    {
      title: i18n.__("sSaveKm"),
      defaultPath: newPath,
      filters: [{ name: "KityMinder", extensions: ["km"] }]
    },
    function(fileName) {
      if (!fileName) {
        return;
      } // cancel save

      defaultPath = fileName;

      var json = editor.minder.exportJson();
      var data = JSON.stringify(editor.minder.exportJson());
      writeFile(fileName, data);
    }
  );
}

function exportDialog() {
  var newPath = path.join(getUserDataDir(), "/" + minder.getRoot().data.text);

  var filters = [];
  var pool = kityminder.data.getRegisterProtocol();
  for (var name in pool) {
    if (pool.hasOwnProperty(name) && pool[name].encode) {
      filters.push({
        name: pool[name].fileDescription,
        extensions: [pool[name].fileExtension.replace(".", "")]
      });
    }
  }

  dialog.showSaveDialog(
    {
      title: i18n.__("sExportKm"),
      defaultPath: newPath,
      filters: filters
    },
    function(fileName) {
      if (!fileName) {
        return;
      } // cancel export

      var ext = fileName.toLowerCase().substring(fileName.lastIndexOf("."));
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

      exportFile(protocol, fileName);
    }
  );
}

function exitApp() {
  logger.info("exit successfully!");

  app.quit();
}

function redo() {
  editor.history.redo();
}

function undo() {
  editor.history.undo();
}

function cut() {
  minder.execCommand("Cut");
}

function copy() {
  minder.execCommand("Copy");
}

function paste() {
  minder.execCommand("Paste");
}

function maxwin() {
  getAppInstance().maximize();
}

function minwin() {
  getAppInstance().minimize();
}

function license() {
  shell.openExternal(
    "https://github.com/NaoTu/DesktopNaotu/blob/master/doc/Help.md"
  );
}

function checkVersion() {
  logger.info("检查是否有新版本发布");

  $.get(
    "https://raw.githubusercontent.com/NaoTu/DesktopNaotu/master/version.js",
    function(data) {
      var newVer = data.substring(19, data.lastIndexOf(","));
      var oldVer = ver.version.slice(0, 3).join(", ");

      if (newVer != oldVer) {
        bootbox.alert(i18n.__("sUpdateMessage"));
        shell.openExternal("https://github.com/NaoTu/DesktopNaotu/releases");
      } else {
        bootbox.alert(i18n.__("sNoUpdatesAvailable"));
      }
    }
  );
}

function about() {
  var text = `
Copyright (c) 2018 Jack

版本： v${ver.version.join(".")}
QQ 讨论群：330722928
    `;
  dialog.showMessageBox({
    type: "info",
    title: i18n.__("sAppName"),
    message: text,
    buttons: ["OK"]
  });
}

function exportFile(protocol, filename) {
  var options = {
    download: true,
    filename: filename
  };

  minder.exportData(protocol.name, options).then(function(data) {
    switch (protocol.dataType) {
      case "text":
        writeFile(filename, data, true);
        break;
      case "base64":
        var base64Data = data.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, "base64");

        writeFile(filename, dataBuffer, true);
        break;
      case "blob":
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
    fs.exists(defPath, function(exists) {
      if (!exists) {
        fs.mkdir(defPath);
      }
    });

    var filePath = path.join(defPath, "/" + time + ".km");
    logger.info("getDefaultPath " + filePath);

    return filePath;
  } catch (ex) {
    logger.error(ex);
  }
}

function getUserDataDir() {
  return (app || remote.app).getPath("userData");
}

function showFileName(fileName) {
  if (fileName != undefined) {
    var index =
      fileName.lastIndexOf("\\") > -1
        ? fileName.lastIndexOf("\\")
        : fileName.lastIndexOf("/");
    var title = fileName.substring(index + 1) + " - " + i18n.__("sAppName");

    getAppInstance().setTitle(title);
  }
}

function getAppInstance() {
  return BrowserWindow.getAllWindows()[0];
}
