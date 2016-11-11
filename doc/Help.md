# 帮助文档

## 如何将百度脑图文件下载到本地？

- 把 脑图下载 按钮拖到标签栏
- 打开脑图在线地址
- 点击标签栏的 脑图下载  按钮即可下载文件

请在 Chrome 和 Firefox 浏览器使用。

<a href="javascript: try{function saveKm(fileName,content){var el=document.createElementNS('http://www.w3.org/1999/xhtml','a');if(el){el.href='data:text/plain,'+content;el.download=fileName;var event=document.createEvent('MouseEvents');event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);el.dispatchEvent(event)}}var json=editor.minder.exportJson();var data=JSON.stringify(editor.minder.exportJson());var fileName=editor.minder.getRoot().data.text+'.km';saveKm(fileName,data)}catch(e){alert(e)}; void (0);">脑图下载</a>

```javascript
try {
    function saveKm(fileName, content) {
        var el = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        if (el) {
            el.href = 'data:text/plain,' + content;
            el.download = fileName;

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            el.dispatchEvent(event);
        }
    }

    var json = editor.minder.exportJson();
    var data = JSON.stringify(editor.minder.exportJson());
    var fileName = editor.minder.getRoot().data.text + '.km';
    saveKm(fileName, data);
} catch (e) {
    alert(e);
}
```