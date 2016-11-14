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
    connect = require('gulp-connect');

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

gulp.task('copy-css', function () {
    return gulp.src('src/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'css task complete' }));
});

gulp.task('copy-js', function () {
    return gulp.src('src/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/'))
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
        'bower',
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
