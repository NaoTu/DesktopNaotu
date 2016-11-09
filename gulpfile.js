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

    run = require('run-sequence'),
    wiredep = require('wiredep').stream,
    connect = require('gulp-connect');
// electron = require('gulp-atom-electron'),
// symdest = require('gulp-symdest');;

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
});

gulp.task('copy-css', function () {
    return gulp.src('src/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-js', function () {
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest('dist/'));
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
        done);
});

gulp.task('watch', function () {
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});


// gulp.task('bundle-desktop-all', function() {
//     var platforms = [
//         // { platform: 'darwin', slug: 'osx' },
//         { platform: 'win32', slug: 'windows' }
//         // , { platform: 'linux', slug: 'linux' }
//     ];
//     platforms.map(function(p) {
//         buildApp(p.platform, p.slug);
//     });
// });

// var buildApp = function(platform, slug) {
//     gulp.src(['dist/**/*'])
//         .pipe(electron({
//             version: '1.4.3',
//             platform: platform
//         }))
//         .pipe(symdest('dist/output/ng2-electron-' + slug));
// };