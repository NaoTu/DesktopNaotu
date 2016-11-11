# 帮助文档

## 如何将百度脑图文件下载到本地？

- 用 Chrome 和 Firefox 浏览器打开百度脑图页面
- 按下 F12 打开控制台界面
- 粘贴下面的代码，按下回车即可下载脑图文件


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


- 方法2：在浏览器书签栏的空白处，右键“添加网页”输入“脑图下载”，在“网址”文本框中粘贴下面的代码，点击“保存”就可以长期使用了：
> javascript: try{function saveKm(fileName,content){var el=document.createElementNS('http://www.w3.org/1999/xhtml','a');if(el){el.href='data:text/plain,'+content;el.download=fileName;var event=document.createEvent('MouseEvents');event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);el.dispatchEvent(event)}}var json=editor.minder.exportJson();var data=JSON.stringify(editor.minder.exportJson());var fileName=editor.minder.getRoot().data.text+'.km';saveKm(fileName,data)}catch(e){alert(e)}; void (0);
