var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var less = require('gulp-less');
var rename = require('gulp-rename');

gulp.task('compileLess', function() {
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('minifyJavaScript', function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(concat('shire.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

var minificationCssFiles = [
    '!/dist/css/*.min.css',
    './dist/css/**/*.css'
];

gulp.task('minifyCss', ['compileLess'], function () {
    return gulp.src(minificationCssFiles)
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(concat('shire.min.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copyFonts', function () {
    return gulp.src('./src/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('clean', function () {
    del.sync(['./dist/**/*', './dist/*'], { force: true });
});

gulp.task('build', ['clean', 'minifyJavaScript', 'minifyCss', 'copyFonts']);

gulp.task('default', ['build']);