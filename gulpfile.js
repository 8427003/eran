var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    livereload = require('gulp-livereload'),
    fileinclude = require('gulp-file-include'),
    merge = require('merge-stream'),
    runSequence = require('run-sequence'),
    template = require('gulp-template'),
    sprite = require('css-sprite').stream,
    replace = require('gulp-replace'),
    del = require('del');

gulp.task('default', function() {
    runSequence('fileinclude-first', 'merge')
});

gulp.task('sprites', function() {
    return gulp.src('./src/images/*.png')
        .pipe(sprite({
            name: 'sprite',
            style: '_sprite.scss',
            cssPath: './images',
            processor: 'scss'
        }))
        .pipe(gulp.dest('./dist/images/'))
        .pipe(gulp.dest('./dist/scss/'))
});

gulp.task('replaces', function() {
    return gulp.src(['./src/file.txt'])
        .pipe(replace(/\.\/images\//g, 'http://quarzz.com/'))
        .pipe(gulp.dest('dist'))
});

gulp.task('fileinclude-after', function() {
    return gulp
        .src(['./dist/index.html'])
        .pipe(rename("index.min.html"))
        .pipe(fileinclude({
            prefix: '##',
            basepath: '@file'
        }))
        .pipe(template(getTemplateData()))
        .pipe(gulp.dest('./dist'));
});


gulp.task('fileinclude-first', function() {
    gulp.src(['./src/html/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
});

function runJsTask() {
    return gulp.src('./src/js/index.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
}


function runCssTask() {
    return gulp.src('./src/css/index.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCSS({
            //  keepBreaks: true
        }))
        .pipe(gulp.dest('./dist'))
}

gulp.task('merge', function() {
    merge(
        runJsTask(),
        runCssTask()
    ).on('end', function() {
        //gulp.run('fileinclude-after');
    });


});

gulp.task('watch', function() {

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch('src/**', ['default'], function() {

    });

    gulp.watch(['dist/index.min.html']).on('change', livereload.changed);


});

gulp.run('watch');

/**
gulp.task('clean', function(cb) {
    del(['./dist/index.min.html'], cb);
})
**/
/**

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
 **/
/**
var concat = require('gulp-concat');
gulp.task('concat', function() {
    gulp.src('./src/module/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'))
});
**/

/**
gulp.task('minify-css', function() {
    gulp.src('./src/css/index.css')
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(gulp.dest('./dist'))
});
**/

/**
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
**/



/**
gulp.task('autoprefixer', function () {
    return gulp.src('src/index.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(gulp.dest('./dist'));
});
**/
