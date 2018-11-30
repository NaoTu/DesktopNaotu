function getDefConf() {
  return {
    locale: app.getLocale(),
    defSavePath: getUserDataDir(),
    recently: []
  };
}

function getConf() {
  if (fs.existsSync(confPath)) {
    return JSON.parse(fs.readFileSync(confPath));
  } else {
    fs.writeFileSync(confPath, JSON.stringify(getDefConf()));

    return getDefConf();
  }
}

function clearRecently() {
  try {
    var confObj = getConf();

    // 清空历史记录的列表
    confObj.recently = [];

    fs.writeFileSync(confPath, JSON.stringify(confObj));

    // 更新菜单
    updateMenus();
  } catch (ex) {
    logger.error(ex);
  }
}

function saveRecords(filePath) {
  var time = new Date().format("yyyy-MM-dd hh:mm:ss");

  // 存在，则读取
  var confObj = getConf();
  var list = confObj.recently;

  // 查重
  var items = [],
    selected = null;
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    if (item.path == filePath) {
      selected = item;
    } else {
      items.push(item);
    }
  }

  if (selected == null) {
    items.splice(0, 0, { time: time, path: filePath });
  } else {
    // 在原来的清单中，则更新
    selected.time = time;
    items.splice(0, 0, selected);
  }

  confObj.recently = items;

  // 更新列表
  fs.writeFileSync(confPath, JSON.stringify(confObj));

  // 更新菜单
  updateMenus();
}

function updateMenus() {
  // 深度复制
  var menus = $.extend(true, [], template);

  var confObj = getConf();
  var list = confObj.recently;

  for (var i = 0; i < Math.min(list.length, 5); i++) {
    // 只显示最近5次
    var item = list[i];

    // 追加到菜单
    var recentFiles = menus[0].submenu[5].submenu;
    recentFiles.splice(recentFiles.length - 2, 0, {
      label: item.path,
      click: openRecently
    });
  }

  // 更新菜单
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}

function openRecently(item) {
  var path = item.label;
  if (path) {
    fs.exists(path, function(result) {
      if (result) {
        // 存在，则读取
        readFile(path);
      } else {
        bootbox.alert(i18n.__("sNoFileLocation"));
      }
    });
  }
}
