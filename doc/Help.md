# 帮助文档

## 一、如何将 **百度脑图** 文件下载到本地？

### 方法1：

- 用 Chrome 或 Firefox 浏览器打开百度脑图页面
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

    var data = JSON.stringify(editor.minder.exportJson());
    var fileName = editor.minder.getRoot().data.text + '.km';
    saveKm(fileName, data);
} catch (e) {
    alert(e);
}
```

### 方法2：

- 在浏览器书签栏的空白处，右键“添加网页”输入“脑图下载”，在“网址”文本框中粘贴下面的代码，点击“保存”就可以长期使用了：

``` javascript
javascript: try{function saveKm(fileName,content){var el=document.createElementNS('http://www.w3.org/1999/xhtml','a');if(el){el.href='data:text/plain,'+content;el.download=fileName;var event=document.createEvent('MouseEvents');event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);el.dispatchEvent(event)}}var data=JSON.stringify(editor.minder.exportJson());var fileName=editor.minder.getRoot().data.text+'.km';saveKm(fileName,data)}catch(e){alert(e)}; void (0);
```

## 二、如何下载 **[ProcessOn](https://www.processon.com/diagrams/new#temp-system)** 上的思维导图呢？

### 操作方法和下载百度脑图一样。在浏览器中按 F12 并在控制台中粘贴下面的代码即可下载。

- 例如：如果你想下载 [《未来简史》思维导图](https://www.processon.com/view/598c3af7e4b020989e5b84d2) ，只需要三步：
- 1、打开页面
- 2、按下 F12
- 3、粘贴下面的代码

```javascript
try {
    function getKmByProcesson(json) {
        function fn(json) {
            var d = { data: { id: json.id, text: json.title.replace(/<br>/g,'\n') } };
            if (json.note != undefined) { d.data.note = json.note; }
            if (json.children == null || json.children.length == 0) { return d; }

            var arr = [];
            json.children.forEach(function (item) { arr.push(fn(item)); });
            d.children = arr;

            return d;
        }

        return { root: fn(json) };
    }

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

    $.ajax({
        url : "/diagraming/getdef?tempId=" + tempId,
        type : 'get',
        data : { id: chartId },
        success : function(c){
            var definition = JSON.parse(c.def);

            var data = getKmByProcesson(definition);
            var fileName = data.root.data.text + '.km';
            saveKm(fileName, JSON.stringify(data));
        },
        fail:function(ex){
          alert(ex);
        }
    });

} catch (e) {
    alert(e);
}
```
