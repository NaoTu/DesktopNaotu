// window.$ = window.jQuery = require('../bower_components/jquery/dist/jquery.min.js');
window.$ = window.jQuery = require("./js/jquery.min.js");

angular
  .module("kityminderDemo", ["kityminderEditor"])
  .config(function(configProvider) {
    configProvider.set("lang", i18n.lang());
    // configProvider.set('imageUpload', '../server/imageUpload.php');

    // if (argv.length >= 2) {
    //     let filePath = argv[1];

    //     //open, read, handle file
    //     if (filePath.indexOf('km') > -1) {
    //         readFile(filePath);
    //     }
    // }
  })
  .controller("MainController", function($scope, $modal) {
    $scope.initEditor = function(editor, minder) {
      window.editor = editor;
      window.minder = minder;
    };
  });

window.$(function() {
  if (minder != null) {
    // auto saving
    minder.on("contentchange", function() {
      if (isSutoSave) {
        saveDialog();
      }
    });

    minder.on("selectionchange", function() {
      var node = minder.getSelectedNode();

      var menu = remote.Menu.getApplicationMenu();

      // 对编辑菜单进行管理
      var editItems = menu.items[1].submenu.items;
      editItems[3].enabled = editItems[4].enabled = editItems[5].enabled = !!node;
    });
  }
});
