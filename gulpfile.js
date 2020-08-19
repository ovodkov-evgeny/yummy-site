const   gulp = require('gulp'),
        pug = require('gulp-pug'),
        stylus = require('gulp-stylus'),
        browserSync = require('browser-sync').create(),
        autoprefixer = require('gulp-autoprefixer'),
        plumber = require('gulp-plumber'),
        concat = require('gulp-concat'),
        sourcemaps = require('gulp-sourcemaps');


gulp.task('stylus', function () {
    return gulp.src('./src/stylus/**/style.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({ 'include css': true }))
        .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/css/"))
        .pipe(browserSync.stream());
});

gulp.task('pug', function () {
    return gulp.src('./src/pug/**/index.pug')
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
});

gulp.task('default', gulp.parallel('stylus', 'pug'), function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        notify: false
    });

    gulp.watch("./src/stylus/**/*.styl", gulp.parallel('stylus'));
    gulp.watch('./src/pug/**/*.pug', gulp.parallel('pug'));
    gulp.watch("./dist/**/*.css").on('change', browserSync.reload);
    gulp.watch("./dist/**/*.js").on('change', browserSync.reload);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('build', gulp.parallel('stylus', 'pug'), function () {
    console.log("building...");
});
