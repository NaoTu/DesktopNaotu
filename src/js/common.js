var defaultPath = null;
var fs = require('fs');
const {dialog} = require('electron').remote;
const {app} = require('electron').remote

app.on('window-all-closed', () => { exitApp(); })

function readFile(fileName) {
    if (!fileName) return;

    defaultPath = fileName;

    fs.readFile(fileName, 'utf8', function (err, data) {
        var json = JSON.parse(data);
        editor.minder.importJson(json);
    });
}

function writeFile(fileName, content) {
    if (!fileName) return;

    fs.writeFile(fileName, content, function (err) {
        if (err) {
            alert("An error ocurred creating the file " + err.message)
        }

        alert("The file has been succesfully saved");
    });
}


function openDialog() {
    dialog.showOpenDialog(
        { filters: [{ name: 'KityMinder', extensions: ['km'] }] },
        (fileName) => {
            if (!fileName) {
                return;
            }

            readFile(fileName[0]);
        }
    );
}

function saveDialog() {
    dialog.showSaveDialog(
        {
            title: "保存 KityMinder 文件",
            defaultPath: defaultPath,
            filters: [{ name: 'KityMinder', extensions: ['km'] }]
        },
        (fileName) => {
            if (!fileName) {
                alert("You didn't save the file");
                return;
            }

            var json = editor.minder.exportJson();
            var data = JSON.stringify(editor.minder.exportJson());
            writeFile(fileName, data);
        }
    );
}

function exitApp() {
    app.quit();
}

function redo() {
    editor.history.redo();
}

function undo() {
    editor.history.undo();
}

function license() {
    alert('MIT')
}

function about() {
    alert('v1.0')
}