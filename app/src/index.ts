// --> ipcRender 渲染线程的入口
import { logger } from "./core/logger";
import { I18n } from "./core/i18n";
import { NaotuMenu } from "./lib/menu";
import { func } from "./lib/func";
import { DesktopConfig } from "./core/conf";

logger.info("ipcRender init");

let configFile = new DesktopConfig();
let naotuMenu = new NaotuMenu();
naotuMenu.Start();

logger.info("Naotu menu start event listener");

func.dropOpenFile();

logger.info("allow drop Open File");

$ = jQuery = require("./js/jquery.min.js");

angular
  .module("kityminderDemo", ["kityminderEditor"])
  .config(function(configProvider: any) {
    configProvider.set("lang", I18n.getLang());

    logger.info(`loaded language ${I18n.getLang()}.`);

    // configProvider.set('imageUpload', '../server/imageUpload.php');

    // if (argv.length >= 2) {
    //     let filePath = argv[1];

    //     //open, read, handle file
    //     if (filePath.indexOf('km') > -1) {
    //         readFile(filePath);
    //     }
    // }
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
      if (configFile.getModel().isAutoSave) {
        func.saveDialog();
      }
    });

    minder.on("selectionchange", function() {
      var node = minder.getSelectedNode();

      //   var menu = remote.Menu.getApplicationMenu();

      //   // 对编辑菜单进行管理
      //   var editItems = menu.items[1].submenu.items;
      //   editItems[3].enabled = editItems[4].enabled = editItems[5].enabled = !!node;
    });
  }
});
