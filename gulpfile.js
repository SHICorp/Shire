var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

gulp.task('minifyJavaScript', function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(concat('shire.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('minifyCss', function () {
    return gulp.src('./src/css/*.css')
        .pipe(minifyCss())
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