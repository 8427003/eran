var gulp = require('gulp');

gulp.task('default', function() {
    console.log('default');
});

var concat = require('gulp-concat');
gulp.task('concat', function() {
    gulp.src('./src/module/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'))
});

var browserify = require('gulp-browserify');
gulp.task('browserify', function() {
    gulp.src('./src/export.js')
        .pipe(browserify())
        .pipe(gulp.dest('./export'))
});

var minifyCSS = require('gulp-minify-css');
gulp.task('minify-css', function() {
    gulp.src('./src/export.css')
        .pipe(minifyCSS({}))
        .pipe(gulp.dest('./export'))
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
    gulp.src(['index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

var watcher = gulp.watch(['src/**'], ['default']);
watcher.on('change', function(event) {
    //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
