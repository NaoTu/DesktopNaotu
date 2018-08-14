// 允许通过拖拽打开文件 
var body = document.body;

body.ondrop = function (e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    if (!file.name.toLowerCase().endsWith(".km")) {
        bootbox.alert("加载文件失败！只允许打开.km格式的文件！")
        return false;
    }

    readFile(file.path);

    return false;
};

body.ondragover = body.ondragleave = body.ondragend = function () {
    return false;
};