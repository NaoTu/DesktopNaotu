# 开发日志

## 开发环境
VSCode


## electron 用于对node程序进行打包。
```
npm install electron --save-dev
npm install electron-prebuilt --save-dev
npm install grunt-electron-installer --save-dev
npm install kityminder-core --save
```
- grunt-electron-installer 用于Windows平台的自动升级


## bower解决了前端库及其依赖安装的问题。
``` bower
bower init

bower install kityminder-editor --save
```

## bower 升级
``` bower
bower update kityminder-editor
bower update kityminder-core
```


## gulp 是前端项目构建工具，用来压缩js和css代码，甚至压缩图片。[相关介绍](http://markpop.github.io/2014/09/17/Gulp入门教程)
创建 gulpfile.js 文件
```
npm install gulp --save-dev

npm install gulp-ruby-sass gulp-autoprefixer gulp-clean-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
npm install --save-dev run-sequence
npm install --save-dev gulp-connect
npm install --save-dev js-beautify
```
- LiveReload 当文件修改时自动刷新页面
- gulp.watch 监听文件的是否修改以便执行相应的任务
- gulp-connect [web服务器](https://github.com/AveVlad/gulp-connect/)
- gulp-atom-electron 


## 使用 wiredep 把依赖的文件引入到html文件中。[相关介绍](http://www.tuicool.com/articles/2qQbMnN)
创建 .bowerrc 文件，并且修改 bower.json 中的 overrides 节点进行重新引用。
```
npm install wiredep --save-dev
```


## jshint 是Javascript代码验证工具，这种工具可以检查你的代码并提供相关的代码改进意见。
``` 
npm install -g jshint
npm install --save-dev jshint
``` 



## 问题解决
[解决 electron 与 jquery 的冲突](http://stackoverflow.com/questions/30271011/electron-jquery-errors)


-- 安装编译工具
cnpm install gulp-main-bower-files --save-dev
cnpm install gulp-filter --save-dev

-- 自动更新
安装electron-squirrel-startup：
cnpm install electron-squirrel-startup

安装grunt-electron-installer：
cnpm install -g grunt-cli
cnpm install grunt grunt-electron-installer --save-dev

升级
npm install -g npm

-- 文件夹创建
https://nodejs.org/api/fs.html#fs_fs_exists_path_callback

-- electron 有专门的userData
https://segmentfault.com/q/1010000006187286?_ea=1042220

mac 编译
/Users/apple/.npm-global/lib/node_modules/electron-packager/cli.js ./ DesktopNaotu --platform=darwin --arch=x64 --out=../OutApp --icon=favicon.icns --app-version=1.6.15 --ignore="(.git|node_modules|screenshot|doc|src|bower_components|electron-packager)" --overwrite --prune

## 加入msg插件
bower install bootbox --save

添加本地 git tag v1.0.1
查看 git tag
推送到远程 git push origin --tags

修改远程仓库的地址
git remote rm origin
git remote add origin https://github.com/NaoTu/DesktopNaotu.git

新的版本号规则：
Major_Version_Number.Minor_Version_Number.Year.Build_Number