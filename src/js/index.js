window.$ = window.jQuery = require('../bower_components/jquery/dist/jquery.min.js');

angular.module('kityminderDemo', ['kityminderEditor']).config(function (configProvider) {
    configProvider.set('imageUpload', '../server/imageUpload.php');
}).controller('MainController', function ($scope, $modal) {
    $scope.initEditor = function (editor, minder) {
        window.editor = editor;
        window.minder = minder;
    };
});