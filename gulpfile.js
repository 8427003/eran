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
    concat = require('gulp-concat'),
    sprite = require('css-sprite').stream,
    replace = require('gulp-replace'),
    del = require('del');


////////////////////////////////////////////////global setting start////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////    

var DEV_DEST_PATH = './dist/dev'; //开发模式下生成的目标文件目录
var PUBLISH_DEST_PATH = './dist/publish'; //发布模式下生成的目标文件目录
var PUBLISH_TEMP_DEST_PATH = './dist/publish_temp'; //发布模式下生成的目标文件目录

var DEFAULT_TASKS = ['html-dev', 'js-dev', 'css-dev', 'image-dev','watch'];
var DEV_TASKS = ['html-dev', 'js-dev', 'css-dev', 'image-dev'];//与default一样，少了一个watch
var PUBLISH_TEMP_TASKS = ['dev', 'html-publish-temp', 'js-publish-temp', 'css-publish-temp', 'image-publish-temp'];
var PUBLISH_TASKS = ['_publish-temp', 'html-publish', 'js-publish', 'css-publish', 'image-publish'];
//default is also named dev 
gulp.task('default', DEFAULT_TASKS, function(cb) {
    cb();
});

gulp.task('dev', DEV_TASKS, function(cb) {
    cb();
});

//依赖于dev任务执行
gulp.task('_publish-temp', PUBLISH_TEMP_TASKS, function(cb) {
    cb();
});

//依赖于_publish-temp任务执行
gulp.task('publish', PUBLISH_TASKS,function(cb) {
    //发布完成后删除临时文件夹
    del(PUBLISH_TEMP_DEST_PATH,cb);
});

//用于开发环境下，文件更改时时编译，且时时刷新浏览器
gulp.task('watch',DEV_TASKS function() {
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch('src/**', ['dev'], function() {});
});

////////////////////////////////////////////////global setting end////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////// dev start/////////////////////////////////
/////////////////////////////////////////////////////////////////////////
gulp.task('html-dev', function() {
    return gulp.src(['./src/html/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(DEV_DEST_PATH));
});

gulp.task('js-dev', function() {
    return gulp.src('./src/js/index.js')
        .pipe(browserify())
        .pipe(gulp.dest(DEV_DEST_PATH));
});

gulp.task('css-dev', function() {
    return gulp.src('./src/css/index.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(DEV_DEST_PATH))
});

gulp.task('image-dev', function() {
    return gulp.src('./src/images/*')
        .pipe(gulp.dest(DEV_DEST_PATH + '/images'));
});

/////////////////////////////// dev end /////////////////////////////////
/////////////////////////////////////////////////////////////////////////



/////////////////////////////// publish start ////////////////////////////
/////////////////////////////////////////////////////////////////////////
gulp.task('html-publish-temp', ['dev'], function() {
    return gulp.src([DEV_DEST_PATH + '/index.html'])
        //output
        .pipe(rename('index.temp.html'))
        .pipe(gulp.dest(PUBLISH_TEMP_DEST_PATH));
});


gulp.task('js-publish-temp', ['dev'], function() {
    return gulp.src(DEV_DEST_PATH + '/index.js')
        //output
        .pipe(rename('index.temp.js'))
        .pipe(gulp.dest(PUBLISH_TEMP_DEST_PATH));
});

gulp.task('css-publish-temp', ['dev'], function() {
    return gulp.src(DEV_DEST_PATH + '/index.css')
        .pipe(rename('index.temp.css'))
        //output
        .pipe(gulp.dest(PUBLISH_TEMP_DEST_PATH));
});

gulp.task('image-publish-temp', ['dev'], function() {
    return gulp.src(DEV_DEST_PATH + '/images/*.png')
        .pipe(sprite({
            name: 'sprite',
            style: 'sprite.css',
            cssPath: './images',
            //retina:true,
            processor: 'css'
        }))
        .pipe(gulp.dest(PUBLISH_TEMP_DEST_PATH + '/sprite'));
});




gulp.task('html-publish', ['_publish-temp'], function() {
    var tempHtml = PUBLISH_TEMP_DEST_PATH + '/index.temp.html';
    return gulp.src(tempHtml)
        .pipe(replace(/\.\/images\//g, 'http://quarzz.com/'))
        //output
        .pipe(rename('index.min.html'))
        .pipe(gulp.dest(PUBLISH_DEST_PATH));
});
gulp.task('css-publish', ['_publish-temp'], function() {
    var tempCss = PUBLISH_TEMP_DEST_PATH + '/index.temp.css';
    var spriteCss = PUBLISH_TEMP_DEST_PATH + '/sprite/sprite.css';

    return gulp.src([tempCss, spriteCss])
        .pipe(concat('index.min.css'))
        //.pipe(minifyCSS())
        .pipe(replace(/\.\/images\//g, 'http://quarzz.com/'))
        //output
        .pipe(gulp.dest(PUBLISH_DEST_PATH));
});
gulp.task('js-publish', ['_publish-temp'], function() {
    var tempJs = PUBLISH_TEMP_DEST_PATH + '/index.temp.js';
    return gulp.src(tempJs)
        .pipe(uglify())
        //output
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest(PUBLISH_DEST_PATH));
});
gulp.task('image-publish', ['_publish-temp'], function() {
    var tempSprites = PUBLISH_TEMP_DEST_PATH + '/sprite/*.png';
    return gulp.src(tempSprites)
        .pipe(gulp.dest(PUBLISH_DEST_PATH + '/sprite'));
});

/////////////////////////////// publish end //////////////////////////////
/////////////////////////////////////////////////////////////////////////




////////////////////////////////////////plugins demo//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/**
gulp.task('include-after', function() {
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
gulp.task('merge', function() {
    merge(
        runJsTask(),
        runCssTask()
    ).on('end', function() {
        //gulp.run('fileinclude-after');
    });


});
**/
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
////////////////////////////////////////plugins demo end////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// publish end //////////////////////////////
/////////////////////////////////////////////////////////////////////////




////////////////////////////////////////plugins demo//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/**
gulp.task('include-after', function() {
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
gulp.task('merge', function() {
    merge(
        runJsTask(),
        runCssTask()
    ).on('end', function() {
        //gulp.run('fileinclude-after');
    });


});
**/
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
////////////////////////////////////////plugins demo end////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
