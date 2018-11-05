const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),

    fs = require('fs'),
    path = require('path'),
    beautify = require('js-beautify').js_beautify,
    run = require('run-sequence'),
    wiredep = require('wiredep').stream,
    connect = require('gulp-connect'),
    mainBowerFiles = require('gulp-main-bower-files'),
    babel = require('gulp-babel'),
    gutil = require('gulp-util');

gulp.task('clean-dist', () => {
    return del(['dist/**/*'], { force: true });
});

gulp.task('bower', function () {
    gulp.src('./src/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({ message: 'bower task complete' }));
});

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

gulp.task('copy-js-vendor', function () {
    // 解决需要引入的问题，单独处理
    gulp.src(["bower_components/jquery/dist/jquery.min.js"])
        .pipe(gulp.dest('dist/js'));

    return gulp.src([
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
        "bower_components/kityminder-editor/dist/kityminder.editor.js",
    ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('copy-css-vendor', function () {
    return gulp.src([
        "bower_components/bootstrap/dist/css/bootstrap.css",
        "bower_components/codemirror/lib/codemirror.css",
        "bower_components/hotbox/hotbox.css",
        "bower_components/kityminder-core/dist/kityminder.core.css",
        "bower_components/color-picker/dist/color-picker.css",
        "bower_components/kityminder-editor/dist/kityminder.editor.css"
    ])
        .pipe(concat('vendor.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/style'))
        .pipe(notify({ message: 'css task complete' }));
});

gulp.task('copy-font-vendor', function () {
    return gulp.src('bower_components/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-images-vendor', function () {
    return gulp.src(['bower_components/kityminder-editor/dist/images/*.*'])
        .pipe(gulp.dest('dist/style/images'));
});

gulp.task('copy-html-vendor', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('copy-css', function () {
    return gulp.src('src/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'css task complete' }));
});

gulp.task('copy-js', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('webserver', function () {
    connect.server({ port: 8848 });
});

gulp.task('default', function (done) {
    run(
        'clean-dist',
        'copy-css',
        'copy-js',
        'copy-html-vendor',
        // 'bower',
        // 'main-bower-files',
        'copy-css-vendor',
        'copy-js-vendor',
        'copy-font-vendor',
        'copy-images-vendor',
        // 'clean-libs',
        'build-version',
        done);
});

gulp.task('watch', function () {
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

gulp.task('build-version', () => {
    // build next version num.
    let fn = path.join(__dirname, '', 'version.js');
    let version = require('./version').version;
    version[3]++;

    console.log(`version -> ${version.join('.')}`);

    let cnt = beautify(`exports.version = ${JSON.stringify(version)};`);
    fs.writeFileSync(fn, cnt, 'utf-8');

    // update package.json
    fn = './package.json';
    cnt = fs.readFileSync(fn);
    let d = JSON.parse(cnt);
    d.version = version.slice(0, 3).join('.');
    cnt = beautify(JSON.stringify(d), { indent_size: 2 });
    fs.writeFileSync(fn, cnt, 'utf-8');
});
