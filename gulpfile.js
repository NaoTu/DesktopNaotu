const gulp = require("gulp"),
  sass = require("gulp-ruby-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  minifycss = require("gulp-clean-css"),
  jshint = require("gulp-jshint"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  notify = require("gulp-notify"),
  cache = require("gulp-cache"),
  livereload = require("gulp-livereload"),
  del = require("del"),
  fs = require("fs"),
  path = require("path"),
  beautify = require("js-beautify").js_beautify,
  run = require("run-sequence"),
  wiredep = require("wiredep").stream,
  connect = require("gulp-connect"),
  mainBowerFiles = require("gulp-main-bower-files"),
  babel = require("gulp-babel"),
  gutil = require("gulp-util"),
  typescript = require("gulp-tsc"),
  source = require('vinyl-source-stream'),
  browserify = require("browserify"),
  tsify = require("tsify"),
  obfuscate = require("gulp-obfuscate");

gulp.task("clean-dist", () => {
  return del(["dist/**/*"], { force: true });
});

gulp.task("index", function() {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['app/src/index.ts'],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("compile", function() {
  return gulp
    .src(["./app/src/**/*.ts"])
    .pipe(
      typescript({
        sourceMap: true,
        target: "ES2015",
        module: "commonjs"
      })
    )
    .pipe(gulp.dest("./dist/"));
});

// gulp.task("bower", function() {
//   gulp
//     .src("./src/index.html")
//     .pipe(
//       wiredep({
//         optional: "configuration",
//         goes: "here"
//       })
//     )
//     .pipe(gulp.dest("./dist/"))
//     .pipe(notify({ message: "bower task complete" }));
// });

// gulp.task('main-bower-files', function () {
//     return gulp.src('./bower.json')
//         .pipe(mainBowerFiles({
//             overrides: {
//                 'kityminder-editor': {
//                     main: [
//                         './dist/images/*.*',
//                         './dist/kityminder.editor.css',
//                         './dist/kityminder.editor.js'
//                     ]
//                 },
//                 bootstrap: {
//                     main: [
//                         './dist/js/bootstrap.js',
//                         './dist/css/*.*',
//                         './dist/fonts/*.*'
//                     ]
//                 }
//             }
//         }))
//         .pipe(gulp.dest('./dist/libs'));
// });

// gulp.task('clean-libs', () => {
//     return del(['dist/libs'], { force: true });
// });

gulp.task("copy-js-vendor", function() {
  // i18n
  gulp.src(["locale/*.json"]).pipe(gulp.dest("dist/locale"));

  // 解决需要引入的问题，单独处理
  gulp
    .src(["bower_components/jquery/dist/jquery.min.js"])
    .pipe(gulp.dest("dist/js"));

  return gulp
    .src([
      "bower_components/jquery/dist/jquery.min.js",
      "bower_components/bootstrap/dist/js/bootstrap.min.js",
      "bower_components/bootbox.js/bootbox.js",
      "bower_components/angular/angular.min.js",
      "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "bower_components/codemirror/lib/codemirror.js",
      "bower_components/codemirror/mode/xml/xml.js",
      "bower_components/codemirror/mode/javascript/javascript.js",
      "bower_components/codemirror/mode/css/css.js",
      "bower_components/codemirror/mode/htmlmixed/htmlmixed.js",
      "bower_components/codemirror/mode/markdown/markdown.js",
      "bower_components/codemirror/addon/mode/overlay.js",
      "bower_components/codemirror/mode/gfm/gfm.js",
      "bower_components/angular-ui-codemirror/ui-codemirror.js",
      "bower_components/marked/lib/marked.js",
      "bower_components/kity/dist/kity.min.js",
      "bower_components/hotbox/hotbox.js",
      "bower_components/json-diff/json-diff.js",
      "bower_components/kityminder-core/dist/kityminder.core.min.js",
      "bower_components/color-picker/dist/color-picker.js",
      "bower_components/kityminder-editor/dist/kityminder.editor.js"
    ])
    .pipe(concat("vendor.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(notify({ message: "Scripts task complete" }));
});

gulp.task("copy-css-vendor", function() {
  return gulp
    .src([
      "bower_components/bootstrap/dist/css/bootstrap.css",
      "bower_components/codemirror/lib/codemirror.css",
      "bower_components/hotbox/hotbox.css",
      "bower_components/kityminder-core/dist/kityminder.core.css",
      "bower_components/color-picker/dist/color-picker.css",
      "bower_components/kityminder-editor/dist/kityminder.editor.css"
    ])
    .pipe(concat("vendor.css"))
    .pipe(minifycss())
    .pipe(gulp.dest("dist/style"))
    .pipe(notify({ message: "css task complete" }));
});

gulp.task("copy-font-vendor", function() {
  return gulp
    .src("bower_components/bootstrap/dist/fonts/*.*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("copy-images-vendor", function() {
  return gulp
    .src(["bower_components/kityminder-editor/dist/images/*.*"])
    .pipe(gulp.dest("dist/style/images"));
});

gulp.task("copy-html-vendor", function() {
  gulp.src("./app/static/index.html").pipe(gulp.dest("dist"));
  // gulp.src("./app/static/favicon.ico").pipe(gulp.dest("dist"));
});

gulp.task("copy-css", function() {
  return gulp
    .src("app/**/*.css")
    .pipe(minifycss())
    .pipe(gulp.dest("dist/"))
    .pipe(notify({ message: "css task complete" }));
});

gulp.task("copy-js", function() {
  return (
    gulp
      .src(["src/**/*.js"])
      .pipe(concat("main.js"))
      // 语法检查
      .pipe(jshint())
      .pipe(jshint.reporter("default"))
      //压缩
      .pipe(
        uglify({
          mangle: false, //类型：Boolean 默认：true 是否修改变量名
          compress: true //类型：Boolean 默认：true 是否完全压缩
        })
      )
      // 混淆
      //   .pipe(obfuscate())
      // 输出到文件夹
      .pipe(gulp.dest("dist/js"))
      .pipe(notify({ message: "Scripts task complete" }))
  );
});

gulp.task("webserver", function() {
  connect.server({ port: 8848 });
});

gulp.task("default", function(done) {
  run(
    "clean-dist",
    "build-version",
    // "index",
    "compile",
    "copy-css",
    // "copy-js",
    "copy-html-vendor",
    // 'bower',
    // 'main-bower-files',
    "copy-css-vendor",
    "copy-js-vendor",
    "copy-font-vendor",
    "copy-images-vendor",
    // 'clean-libs',
    done
  );
});

gulp.task("watch", function() {
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(["dist/**"]).on("change", livereload.changed);
});

gulp.task("build-version", () => {
  // build next version num.
  let url = path.join(__dirname, "app/src", "version.ts");
  let text = fs.readFileSync(url, "utf-8");
  let version = text
    .substring(text.indexOf("[") + 1, text.lastIndexOf("]"))
    .replace(/ /gi, "")
    .split(",");
  version[0] = parseInt(version[0]);
  version[1] = parseInt(version[1]);
  version[2] = parseInt(version[2]);
  version[3]++;
  // let version = require("./dist/version").version;
  // version[3]++;

  console.log(`version -> ${version.join(".")}`);

  let cnt = beautify(`export let version = ${JSON.stringify(version)};`);
  fs.writeFileSync(url, cnt, "utf-8");

  // update package.json
  url = "./package.json";
  cnt = fs.readFileSync(url);
  let d = JSON.parse(cnt);
  d.version = version.slice(0, 3).join(".");
  cnt = beautify(JSON.stringify(d), { indent_size: 2 });
  fs.writeFileSync(url, cnt, "utf-8");
});
