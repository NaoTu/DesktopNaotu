// --> ipcRender 渲染线程的入口
import { logger } from "./core/logger";
import { I18n } from "./core/i18n";
import { naotuMenu } from "./lib/menu";
import { naotuConf } from "./core/conf";
import { remote } from "electron";
import { dropOpenFile, openKm } from "./lib/file";
import { saveDialog } from "./lib/dialog";

// 进入即记录日志
logger.info("ipcRender init");

// 初始化渲染菜单
naotuMenu.render();

// 开启拖动打开文件的功能
dropOpenFile();

angular
  .module("kityminderDemo", ["kityminderEditor"])
  .config(function(configProvider: any) {
    configProvider.set("lang", I18n.getLang());

    // configProvider.set('imageUpload', '../server/imageUpload.php');
    let argv = remote.process.argv;
    if (argv.length >= 2) {
      let filePath = argv[1] as string;

      if (filePath.indexOf("km") > -1) {
        openKm(filePath);
      }
    }
  })
  .controller("MainController", function($scope: any, $modal: any) {
    $scope.initEditor = function(editor: any, minder: any) {
      editor = editor;
      minder = minder;
    };
  });

$(function() {
  if (minder != null) {
    // auto saving
    minder.on("contentchange", function() {
      if (naotuConf.getModel().isAutoSave) {
        saveDialog();
      }
    });

    minder.on("selectionchange", function() {
      let node = minder.getSelectedNode();

      //   let menu = remote.Menu.getApplicationMenu();

      //   // 对编辑菜单进行管理
      //   let editItems = menu.items[1].submenu.items;
      //   editItems[3].enabled = editItems[4].enabled = editItems[5].enabled = !!node;
    });
  }
});
