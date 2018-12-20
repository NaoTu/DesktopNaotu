// --> ipcRender 渲染线程的入口
import { logger } from "./core/logger";
import { I18n } from "./core/i18n";
import { naotuMenu } from "./lib/menu";
import { naotuConf } from "./core/conf";
import { openFileByDrop, openKm } from "./lib/file";
import { saveDialog } from "./lib/dialog";
import { monitorExitRequest } from "./lib/exit";
import { naotuBase } from "./lib/base";
import { onSelectedNodeItem } from "./lib/minder";
import { remote } from "electron";

// 进入即记录日志
logger.info("ipcRender init");

// 初始化渲染菜单
naotuMenu.render();

// 开启拖动打开文件的功能
openFileByDrop();

// 监听退出请求
monitorExitRequest();

angular
  .module("kityminderDemo", ["kityminderEditor"])
  .config(function(configProvider: any) {
    configProvider.set("lang", I18n.getLang());

    // configProvider.set('imageUpload', '../server/imageUpload.php');
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
    minder.on("contentchange", function(argv: any) {
      logger.info(`invoked contentchange()`);

      naotuBase.OnEdited();

      if (naotuConf.getModel().isAutoSave) {
        saveDialog();
      }
    });

    minder.on("selectionchange", function() {
      let node = minder.getSelectedNode();

      // 修改菜单的状态
      onSelectedNodeItem(!!node);
    });

    // 通过参数打开文件
    // 此方法需要放在注册 contentchange 事件之后。
    let argv = remote.process.argv;
    logger.info(`remote.process.argv: ${argv}`);

    if (argv.length >= 2) {
      let filePath = argv[1] as string;

      if (filePath.indexOf("km") > -1) {
        openKm(filePath);
      }
    }
  }
});
