// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var less = require('gulp-less');
var path = require('path');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

// Compile our less
gulp.task('less', function () {
    return gulp.src('./public/less/imports.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./public/styles/'));
});

// Default Task
gulp.task('default', ['less']);