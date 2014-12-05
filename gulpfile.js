var gulp = require('gulp');

gulp.task('default', ['fileinclude', 'browserify', 'sass-min'], function() {
    console.log('default----------------done');
});

var concat = require('gulp-concat');
gulp.task('concat', function() {
    gulp.src('./src/module/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'))
});

var browserify = require('gulp-browserify');
gulp.task('browserify', function() {
    gulp.src('./src/js/index.js')
        .pipe(browserify())
        .pipe(gulp.dest('./dist'))
});

var minifyCSS = require('gulp-minify-css');
gulp.task('minify-css', function() {
    gulp.src('./src/css/index.css')
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(gulp.dest('./dist'))
});

// run a command in a shell
var exec = require('child_process').exec;
gulp.task('jekyll', function(cb) {
    // build Jekyll
    exec('ls -a', function(err, stdout, stderr) {
        if (err) return cb(err); // return error
        console.log(stdout);
        cb(); // finished task
    });
});

var fileinclude = require('gulp-file-include');
gulp.task('fileinclude', function() {
    gulp.src(['./src/html/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
});


var sass = require('gulp-sass');
gulp.task('sass-min', function() {
    gulp.src('./src/css/index.scss')
        .pipe(sass())
        .pipe(minifyCSS({
            //keepBreaks: true
        }))
        .pipe(gulp.dest('./dist'));
});

var watcher = gulp.watch(['src/**'], ['default']);
watcher.on('change', function(event) {
    //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
