# 帮助文档

## 一、下载所有脑图文件

1. 在谷歌浏览器中，打开在线脑图的列表页 [http://naotu.baidu.com/home](http://naotu.baidu.com/home)
2. 当前，前提是你得先登陆。^_^
3. 按下`F12`进入调试模式，切换到`Console`标签页
4. 粘贴下面的代码，回车键执行
5. 等待数秒后，浏览器自动下载压缩文件

``` javascript
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('$.s("t://A.y.z/e-C/0.0.2/e-C.x.q",c);$.s("t://A.y.z/e/3.1.4/e.x.q",c);$.s("t://Y.Z.12/e/16/13.q",c);5 F=0;6 c(){l(++F==3){S{6 r(u,b,E){$.P({u:u,M:"T",U:G,1d:G,b:b,c:6(J,1i,1j){E(J)}})}5 f={1k:$("#1n-1o").1m()};6 B(a){5 7=n;r("k/1l",$.I(H,{19:a},f),6(d){7=d.b});D 7}6 K(a){5 7=n;r("k/1a",$.I(H,{18:a},f),6(d){7=d.b});D 7}6 w(a,o){5 j=B(a);1f(5 i=0;i<j.1c;i++){5 9=j[i];l(9.L=="1e"){5 m=o.m(9.N);w(9.v,m)}1b l(9.L=="8"){5 8=K(9.v);o.8(8.N+8.17,8.p)}}}5 g=1h 1g();5 h=n;r("k/X",f,6(d){h=d.b});w(h.v,g);g.14({M:"15"}).11(6(p){10(p,h.Q+"R.g")})}W(O){V(O)}}}',62,87,'|||||var|function|ret|file|item|id|data|success||jszip|baseModel|zip|root||dir|bos|if|folder|null|el|content|js||getScript|https|url|file_guid|dirSearch|min|cdnjs|net|libs|getDir|utils|return|callback|count|false|true|extend|result|getFile|file_type|type|file_name|error|ajax|creater_name|_0|try|POST|cache|alert|catch|get_root_dir|stuk|github|saveAs|then|io|FileSaver|generateAsync|blob|vendor|ext_name|fileGuid|dirGuid|open|else|length|async|directory|for|JSZip|new|status|xhr|csrf_token|ls|val|km|csrf'.split('|'),0,{}));
```

## 二、如何下载单个脑图文件到本地？

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

## 三、如何下载 **[ProcessOn](https://www.processon.com/diagrams/new#temp-system)** 上的思维导图呢？

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
