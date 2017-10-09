window.$ = window.jQuery = require('../bower_components/jquery/dist/jquery.min.js');

var remote = require('electron').remote,
    argv = remote.getGlobal('sharedObject').prop1;

angular.module('kityminderDemo', ['kityminderEditor']).config(function (configProvider) {
    configProvider.set('imageUpload', '../server/imageUpload.php');

    if (argv.length >= 2) {
        let filePath = argv[1];

        //open, read, handle file
        if (filePath.indexOf('km') > -1) {
            readFile(filePath);
        }
    }

}).controller('MainController', function ($scope, $modal) {
    $scope.initEditor = function (editor, minder) {
        window.editor = editor;
        window.minder = minder;
    };
});

window.$(function () {
    if (minder != null) {// auto saving
        minder.on('contentchange', function () {
            saveDialog();
        });
    }
});