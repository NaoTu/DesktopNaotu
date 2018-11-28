function getDefConf() {
  return {
    locale: app.getLocale(),
    defSavePath: getUserDataDir(),
    recently: []
  };
}

function clearRecently() {
  try {
    // 读取配置文件
    var confObj = JSON.parse(fs.readFileSync(confPath));
    if (confObj != null) {
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
}

function saveRecords(filePath) {
  var time = new Date().format("yyyy-MM-dd hh:mm:ss");

  fs.exists(confPath, function(exists) {
    if (!exists) {
      // 不存在，则创建
      var confObj = getDefConf();
      confObj.recently.push({ time: time, path: filePath });

      fs.writeFileSync(confPath, JSON.stringify(confObj));
    } else {
      // 存在，则读取
      var confObj = JSON.parse(fs.readFileSync(confPath));
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
    }
  });

  // 更新菜单
  updateMenus();
}

function updateMenus() {
  fs.exists(confPath, function(exists) {
    if (exists) {
      // 存在，则读取

      // 深度复制
      var menus = $.extend(true, [], template);

      var confObj = JSON.parse(fs.readFileSync(confPath));
      var list = confObj.recently;

      for (var i = 0; i < Math.min(list.length, 5); i++) {
        // 只显示最近5次
        var item = list[i];

        // 追加到菜单
        menus[0].submenu[4].submenu.splice(
          menus[0].submenu[4].submenu.length - 2,
          0,
          {
            label: item.path,
            click: openRecently
          }
        );
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
