# 帮助文档

## 一、下载所有百度脑图文件

场景：

百度脑图的文件是存放在百度的服务器上的，如果想在本地计算机上保留一份，那么可以用下面的方法进行批量下载。

通过下面的代码来备份，可以保留在线版的目录结构。建议定期备份你的脑图文件到本地。

步骤：

1. 在谷歌浏览器中，打开在线脑图的列表页 [http://naotu.baidu.com/home](http://naotu.baidu.com/home)
2. 当前，前提是你得先登陆。^_^
3. 按下`F12`进入调试模式，切换到`Console`标签页
4. 粘贴下面的代码，回车键执行
5. 等待数秒后，浏览器自动下载压缩文件

```javascript
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 S=0;7 w(){x(++S==3){1T{7 r(d,e,f){$.12({K:d,W:"1J",1F:T,1x:T,v:e,w:7(a,b,c){f(a)}})}7 l(a,b){x(b){z.R(a)}Z{z.R(\'%c\'+a+\'     \',\'1b: K("v:1v/1e+1B;1C,1E+1G+1I+1K+1O+1Q+1U==") 15 16-17;\')}}6 g={1c:$("#1k-1m").1o()};7 O(a){6 b=G;r("A/1D",$.X(o,{1H:a},g),7(d){b=d.v});P b}7 Q(a){6 b=G;r("A/1L",$.X(o,{1M:a},g),7(d){b=d.v});P b}7 B(a,b){6 c=O(a);1P(6 i=0;i<c.1S;i++){6 d=c[i];x(d.U=="1V"){6 e=b.1W(d.V);B(d.C,e)}Z x(d.U=="Y"){6 f=Q(d.C);b.Y(f.V+f.18,f.19)}}}z.1a();l(\'脑图打包程序启动成功！\',o);6 h=10 1d();6 j=G;r("A/1f",g,7(d){j=d.v});l(\'正在加载文件，请稍候\');B(j.C,h);l(\'已完成文件加载！\',o);l(\'正在打包文件，请稍候\');h.1g({W:"1h"}).1i(7(a){l(\'已完成文件打包！\',o);6 d=10 1j();6 t=d.1l()+\'13\'+(d.1n()+1)+\'13\'+d.1p();1q(a,j.1r+"1s"+t+".1t");l(\'恭喜，脑图文件打包下载成功！\',o)})}1u(D){1w(D)}}}7 u(a){$.12({K:a.1y(),1z:"1A",w:w,D:7(r,s){u(a)}})}u([\'//E.F.y/n.8/H-11-I/n.k.8\',\'//p.J.m/n.8/H-11-I/n.k.8\',\'//1N.L.m/p/N-1-M/??n.8/H-1R-I/n.k.8\']);u([\'//E.F.y/9-q/0.0.2/9-q.k.8\',\'//p.J.m/9-q/0.0.2/9-q.k.8\',\'//14.L.m/p/N-1-M/9-q/0.0.2/9-q.k.8\']);u([\'//E.F.y/9/3.1.4/9.k.8\',\'//p.J.m/9/3.1.4/9.k.8\',\'//14.L.m/p/N-1-M/??9/3.1.5/9.k.8\']);',62,121,'||||||var|function|js|jszip|||||||||||min|printf|com|FileSaver|true|cdn|utils||||loadJs|data|success|if|net|console|bos|dirSearch|file_guid|error|libs|cdnjs|null|2014|29|bootcss|url|pstatp||expire|getDir|return|getFile|log|count|false|file_type|file_name|type|extend|file|else|new||ajax|_|s0|right|no|repeat|ext_name|content|clear|background|csrf_token|JSZip|svg|get_root_dir|generateAsync|blob|then|Date|km|getFullYear|csrf|getMonth|val|getDate|saveAs|creater_name|_km_|zip|catch|image|alert|async|shift|dataType|script|xml|base64|ls|PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMzBweCIgdmlld0JveD0iMCAwIDI0IDMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MCA1MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogICAgPHJlY3QgeD0iMCIgeT0iNi43MTczNiIgd2lkdGg9IjQiIGhlaWdodD0iMTcuNTY1MyIgZmlsbD0iIzMzMyI|cache|CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImhlaWdodCIgYXR0cmlidXRlVHlwZT0iWE1MIiB2YWx1ZXM9IjU7MjE7NSIgYmVnaW49IjBzIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU|dirGuid|CiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSIxMzsgNTsgMTMiIGJlZ2luPSIwcyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI|POST|PC9hbmltYXRlPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0iMTAiIHk9IjcuMjgyNjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjE2LjQzNDciIGZpbGw9IiMzMzMiPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJoZWlnaHQiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSI1OzIxOzUiIGJlZ2luPSIwLjE1cyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI|open|fileGuid|s3|PC9hbmltYXRlPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ5IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMTM7IDU7IDEzIiBiZWdpbj0iMC4xNXMiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9IjIwIiB5PSIxMS4yODI2IiB3aWR0aD0iNCIgaGVpZ2h0PSI4LjQzNDcyIiBmaWxsPSIjMzMzIj4KICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iaGVpZ2h0IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iNTsyMTs1IiBiZWdpbj0iMC4zcyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI|for|PC9hbmltYXRlPgogICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ5IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMTM7IDU7IDEzIiBiZWdpbj0iMC4zcyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI|08|length|try|PC9hbmltYXRlPgogICAgPC9yZWN0PgogIDwvc3ZnPg|directory|folder'.split('|'),0,{}))
```

![图片教程](https://user-images.githubusercontent.com/2252451/51811769-8116f300-22e9-11e9-9a2f-821223a26358.gif)

## 二、如何下载单个百度脑图文件到本地？

### 方法1：

- 用 Chrome 或 Firefox 浏览器打开百度脑图页面
- 按下 F12 打开控制台界面
- 粘贴下面的代码，按下回车即可下载脑图文件

```javascript
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h{l 4(a,b){3 c=6.i(\'r://t.y.z/B/F\',\'a\');f(c){c.g=\'2:5/j,\'+b;c.k=a;3 d=6.m(\'n\');d.o(\'p\',q,1,s,0,0,0,0,0,1,1,1,1,0,u);c.v(d)}}3 2=w.x(7.8.A());3 9=7.8.C().2.5+\'.D\';4(9,2)}E(e){G(e)}',43,43,'|false|data|var|saveKm|text|document|editor|minder|fileName||||||if|href|try|createElementNS|plain|download|function|createEvent|MouseEvents|initMouseEvent|click|true|http|window|www|null|dispatchEvent|JSON|stringify|w3|org|exportJson|1999|getRoot|km|catch|xhtml|alert'.split('|'),0,{}))
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
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('W{2 o(e){2 6(b){1 d={4:{7:b.7,9:b.s.v(/<w>/g,\'\\n\')}};f(b.h!=u){d.4.h=b.h}f(b.5==i||b.5.z==0){8 d}1 c=[];b.5.12(2(a){c.t(6(a))});d.5=c;8 d}8{j:6(e)}}2 k(a,b){1 c=l.x(\'y://r.A.B/C/D\',\'a\');f(c){c.E=\'4:9/F,\'+b;c.G=a;1 d=l.H(\'I\');d.J(\'K\',L,3,M,0,0,0,0,0,3,3,3,3,0,i);c.N(d)}}$.O({P:"/Q/R?p="+p,S:\'T\',4:{7:U},V:2(c){1 a=q.X(c.Y);1 b=o(a);1 d=b.j.4.9+\'.Z\';k(d,q.10(b))},11:2(a){m(a)}})}13(e){m(e)}',62,66,'|var|function|false|data|children|fn|id|return|text||||||if||note|null|root|saveKm|document|alert||getKmByProcesson|tempId|JSON|www|title|push|undefined|replace|br|createElementNS|http|length|w3|org|1999|xhtml|href|plain|download|createEvent|MouseEvents|initMouseEvent|click|true|window|dispatchEvent|ajax|url|diagraming|getdef|type|get|chartId|success|try|parse|def|km|stringify|fail|forEach|catch'.split('|'),0,{}))
```

## 四、如何在打印的时候，去掉节点前面的“展开或关闭”的小圆圈

- 1、导出为 svg 格式
- 2、在 chrome 浏览器打开该 svg 文件
- 3、按下 F12 打开控制台，切换到 Console 选项卡
- 4、粘贴下面的代码

```javascript
document.querySelectorAll('g[id^="node_expander"]').forEach(n => n.remove());
```

![打印优化的动图](https://user-images.githubusercontent.com/2252451/53856785-7ea56880-400e-11e9-8b27-403690e365a5.gif)

## 五、怎么重选默认保存路径

在菜单栏中，点击 `文件` 下的 `重选自动保存的目录` 菜单，或按 Ctrl+R 快捷键重选目录。