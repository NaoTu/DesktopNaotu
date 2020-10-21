# AnClark的编译探索过程

## 系统环境
- **Node.js**: 
  - **Windows下**：v14.13.1
  - **Arch Linux下，NVM切换**：9.0.0/12（LTS版）/14.13
- **NPM**: v6.14.8

## 第一次尝试

### 最初的编译步骤

1. 克隆源码后，`cnpm install`、`bower install`安装所有依赖
2. `npm run start`开始编译
3. 新版本Node.js下我手动更新了graceful-fs到`@^4.2`，否则报错。在9.0版本Node.js中该组件不存在此问题，可忽略。

### 配置文件

- Windows下，根据文档Dev.md一路安装各种组件。<del>走弯路了。。。</del>
- Arch Linux下重来，没有修改`package.json`。直接`npm install`安装全部依赖，不再逐一安装。

最终两系统都出现了同样的编译错误。

### 结果卡在这地方。。。

```log
[08:48:33] Using gulpfile D:\WUDownloadCachee\DesktopNaotu\gulpfile.js
[08:48:33] Starting 'default'...
[08:48:33] Starting 'clean-dist'...
[08:48:33] Finished 'clean-dist' after 60 ms
[08:48:33] Starting 'build-version'...
version -> 3.2.3.525
[08:48:33] Finished 'build-version' after 44 ms
[08:48:33] Starting 'compile'...
[08:48:33] Compiling TypeScript files using tsc version 3.9.7
[08:48:39] [tsc] > app/src/core/exec.ts(18,32): error TS2769: No overload matches this call.
[08:48:39] [tsc] >   The last overload gave the following error.
[08:48:39] [tsc] >     Argument of type '{ encoding: string; }' is not assignable to parameter of type 'BaseEncodingOptions & ExecOptions'.
[08:48:39] [tsc] >       Type '{ encoding: string; }' is not assignable to type 'BaseEncodingOptions'.
[08:48:39] [tsc] >         Types of property 'encoding' are incompatible.
[08:48:39] [tsc] >           Type 'string' is not assignable to type 'BufferEncoding'.
[08:48:39] [tsc] > app/src/lib/dialog.ts(23,9): error TS2345: Argument of type '{ filters: { name: string; extensions: string[]; }[]; }' is not assignable to parameter of type 'BrowserWindow'.
[08:48:39] [tsc] >   Object literal may only specify known properties, and 'filters' does not exist in type 'BrowserWindow'.
[08:48:39] [tsc] > app/src/lib/dialog.ts(76,7): error TS2345: Argument of type '{ title: string; defaultPath: string; filters: { name: string; extensions: string[]; 
}[]; }' is not assignable to parameter of type 'BrowserWindow'.
[08:48:39] [tsc] >   Object literal may only specify known properties, and 'defaultPath' does not exist in type 'BrowserWindow'.
[08:48:39] [tsc] > app/src/lib/dialog.ts(97,9): error TS2345: Argument of type '{ properties: string[]; defaultPath: string; }' is not assignable to parameter of type 'BrowserWindow'.
[08:48:39] [tsc] >   Object literal may only specify known properties, and 'properties' does not exist in type 'BrowserWindow'.
[08:48:39] [tsc] > app/src/lib/dialog.ts(142,7): error TS2345: Argument of type '{ title: string; defaultPath: string; filters: any[]; }' is not assignable to parameter of type 'BrowserWindow'.
[08:48:39] [tsc] >   Object literal may only specify known properties, and 'defaultPath' does not exist in type 'BrowserWindow'.
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(1674,31): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(3079,31): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(3519,25): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(3696,26): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(4249,30): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(4645,33): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(5233,36): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(5241,33): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(5579,30): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(6474,32): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(6515,25): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7646,37): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7658,31): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7668,31): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7681,33): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7693,34): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7709,42): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7722,32): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7736,32): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(7857,22): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] [tsc] > node_modules/_electron@9.3.2@electron/electron.d.ts(8366,29): error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
[08:48:39] Failed to compile TypeScript: Error: tsc command has exited with code:2
```

## 第二次尝试

前文中出现的这一系列日志，实际上是因为新版本Electron暂不支持`@types/node`的最新版本（v14）：

```
error TS2689: Cannot extend an interface 'NodeJS.EventEmitter'. Did you mean 'implements'?
```

更换`@types/node`为`12.x`版本，即可解决。

```bash
cnpm install @types/node@12.x
```

同时注意保持TypeScript为`3.9.x`版本（最新的`4.x`也可），Node.js为`9.x`（或更新了graceful-fs后的`14.x`）。

### 于是，新的编译错误出现了。。。

```
[17:42:21] Using gulpfile D:\WUDownloadCachee\DesktopNaotu\gulpfile.js
[17:42:21] Starting 'default'...
[17:42:21] Starting 'clean-dist'...
[17:42:21] Finished 'clean-dist' after 78 ms
[17:42:21] Starting 'build-version'...
version -> 3.2.3.535
[17:42:21] Finished 'build-version' after 37 ms
[17:42:21] Starting 'compile'...
[17:42:21] Compiling TypeScript files using tsc version 4.0.3
[17:42:28] [tsc] > app/src/lib/dialog.ts(23,9): error TS2345: Argument of type '{ filters: { name: string; extensions: string[]; }[]; }' is not assignable to parameter of type 'BrowserWindow'.
[17:42:28] [tsc] >   Object literal may only specify known properties, and 'filters' does not exist in type 'BrowserWindow'.
[17:42:28] [tsc] > app/src/lib/dialog.ts(76,7): error TS2345: Argument of type '{ title: string; defaultPath: string; filters: { name: string; extensions: string[]; 
}[]; }' is not assignable to parameter of type 'BrowserWindow'.
[17:42:28] [tsc] >   Object literal may only specify known properties, and 'defaultPath' does not exist in type 'BrowserWindow'.
[17:42:28] [tsc] > app/src/lib/dialog.ts(97,9): error TS2345: Argument of type '{ properties: string[]; defaultPath: string; }' is not assignable to parameter of type 'BrowserWindow'.
[17:42:28] [tsc] >   Object literal may only specify known properties, and 'properties' does not exist in type 'BrowserWindow'.
[17:42:28] [tsc] > app/src/lib/dialog.ts(142,7): error TS2345: Argument of type '{ title: string; defaultPath: string; filters: any[]; }' is not assignable to parameter of type 'BrowserWindow'.
[17:42:28] [tsc] >   Object literal may only specify known properties, and 'defaultPath' does not exist in type 'BrowserWindow'.
[17:42:28] Failed to compile TypeScript: Error: tsc command has exited with code:2
```

## 最后一弹。。刚刚猛然发现

思来想去，还是参考下最新版release。用`asar`解开release安装目录的`resources/app.asar`，阅读`package.json`，发现用了以下版本的库：

```json
...
"devDependencies": {
    "@babel/core": "^7.1.2",
    "@types/byline": "^4.2.31",
    "browserify": "^16.2.3",
    "del": "^3.0.0",
    "electron": "^3.0.11",
    "electron-packager": "^12.2.0",
    "electron-prebuilt": "^1.4.13",
    "grunt": "^1.0.3",
    "grunt-electron-installer": "^2.1.0",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^6.0.0",
    "gulp-babel": "^8.0.0",
    "gulp-cache": "^1.0.2",
    "gulp-clean-css": "^3.10.0",
    "gulp-concat": "^2.6.1",
    "gulp-connect": "^5.6.1",
    "gulp-filter": "^5.1.0",
    "gulp-imagemin": "^4.1.0",
    "gulp-jshint": "^2.1.0",
    "gulp-livereload": "^4.0.0",
    "gulp-main-bower-files": "^1.6.3",
    "gulp-minify-css": "^1.2.4",
    "gulp-notify": "^3.2.0",
    "gulp-obfuscate": "^0.2.9",
    "gulp-rename": "^1.4.0",
    "gulp-ruby-sass": "^3.0.0",
    "gulp-tsc": "^1.3.2",
    "gulp-uglify": "^3.0.1",
    "js-beautify": "^1.8.6",
    "jshint": "^2.9.6",
    "run-sequence": "^2.2.1",
    "tsify": "^4.0.1",
    "typescript": "^3.2.2",
    "vinyl-source-stream": "^2.0.0",
    "wiredep": "^4.0.0"
  },
  "dependencies": {
    "hotkeys-js": "^3.3.8",
    "moment": "^2.23.0",
    "winston": "^3.1.0"
  }
...

```

**其中Electron居然是`3.x`的版本。安装这个版本试试看，保持其他依赖不变**：

```
cnpm install electron@3.x
gulp
```

**果然顺利编译！**

最后运行测试。再在工程`package.json`中添加一行：

```diff
@@ -5,6 +5,7 @@
   "main": "dist/main.js",
   "scripts": {
     "start": "gulp default",
+    "demo": "electron .",
     "packwin32": "cross-var electron-packager ./ DesktopNaotu --asar --platform=win32 --arch=ia32 --out=../OutApp --icon=app/static/favicon.ico --electron-version=3.0.10 --app-version=$npm_package_version --ignore=\"(.git|screenshot|doc|src|app|bower_components|electron-packager)\" --overwrite --prune",
     "packwin32dev": "cross-var electron-packager ./ DesktopNaotu --platform=win32 --arch=ia32 --out=../OutApp --icon=app/static/favicon.ico --electron-version=3.0.10 --app-version=$npm_package_version --ignore=\"(.git|screenshot|doc|bower_components|electron-packager)\" --overwrite --prune",
     "packwin64": "cross-var electron-packager ./ DesktopNaotu --asar --platform=win32 --arch=x64 --out=../OutApp --icon=app/static/favicon.ico --electron-version=3.0.10 --app-version=$npm_package_version --ignore=\"(.git|screenshot|doc|src|app|bower_components|electron-packager)\" --overwrite --prune",
```

然后

```
npm run demo
```

**成功运行了起来！**
