var gulp = require('gulp'),

    //template
    template = require('gulp-template'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    htmlInclude = require('gulp-html-tag-include'),

    //js
    browserify = require('gulp-browserify'),
    jsbeautify = require('gulp-beautify'),
    uglify = require('gulp-uglify'),
    //sourcemaps = require('gulp-sourcemaps'),
    //jshint = require('gulp-jshint'),
    //stylish = require('jshint-stylish'),
    //notify = require('gulp-notify'),

    //css
    autoprefixer = require('gulp-autoprefixer'),
    cssbeautify = require('gulp-cssbeautify'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),

    //html
    htmlbeautify = require('gulp-html-prettify'),

    //img
    sprite = require('css-sprite').stream,

    //util
    rename = require("gulp-rename"),
    del = require('del'),
    merge = require('merge-stream'),
    //fs = require('fs'),
    path = require('path'),
    livereload = require('gulp-livereload'),
    //cheerio = require('gulp-cheerio'),
    //htmlSrc = require('gulp-html-src'),
    //vinylPaths = require('vinyl-paths'),
    //rte = require('gulp-rte'),
    //filter = require('gulp-filter'),

    config = require('./config.json');



var Util = {
    getPaths: function(prefix, sourcePath, after) {
        var prefix = prefix || '';
        var after = after || '';

        if (typeof sourcePath === 'string') {
            return prefix + sourcePath + after;
        } else {
            var result = [];
            for (var i = 0; i < sourcePath.length; i++) {
                result.push(prefix + sourcePath[i] + after);
            }
            return result;
        }
    },
    getPathFormObj: function(classDirs) {
        var result = [];
        for (var className in classDirs) {
            result.push(classDirs[className] + '/' + className + '.css')
        }
        return result;
    }
}
var css_path_1 = /url\(["']?(?!http:\/\/).*?([\w-]+\.\w+)["']?\)/ig;
var css_path_2 = /src=["'](?!http:\/\/).*?([\w-]+\.\w+)["']/ig;
var CSS_PATH_REG = [css_path_1,css_path_2];
var IMG_BASE_PATH = 'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20150121/';
var SOURCE_HTML = ['/html/index.html'];
var SOURCE_JS = ['/js/index.js'];
var SOURCE_CSS = ['/css/index.*css'];
var SOURCE_IMG = {
    '/css/index.*css': {
        "icon-1": "/images/icon-1"
    }
};
var IS_CSS_OUT_LINK = false;
var IS_JS_OUT_LINK = false;


////////////////////////////////////////////////global setting start////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////    
var DEV_DEST_PATH = 'dist/dev'; //开发模式下生成的目标文件目录
var PUBLISH_DEST_PATH = 'dist/publish'; //发布模式下生成的目标文件目录
var DEFAULT_TASKS = ['clean-dev', 'js-dev', 'css-dev', 'image-dev', 'html-dev', 'watch'];
var DEV_TASKS = ['clean-dev', 'js-dev', 'css-dev', 'html-dev']; //与default一样，少了一个watch
var PUBLISH_TASKS = ['dev', 'js-publish', 'css-publish', 'html-publish','image-publish'];


//default is also named dev 
gulp.task('default', DEFAULT_TASKS, function(cb) {
    cb();
});

gulp.task('dev', DEV_TASKS, function(cb) {
    cb();
});

//依赖于_publish-temp任务执行
gulp.task('publish', PUBLISH_TASKS, function(cb) {

});
gulp.task('reload', ['dev'], function() {
    livereload.changed();
});

//用于开发环境下，文件更改时时编译，且时时刷新浏览器
gulp.task('watch', DEV_TASKS, function() {
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch('src/**', ['dev', 'reload'], function() {

    });

});
////////////////////////////////////////////////global setting end////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////// dev start/////////////////////////////////
/////////////////////////////////////////////////////////////////////////

gulp.task('clean-dev', function() {
    del.sync(DEV_DEST_PATH);
});

gulp.task('html-dev', ['clean-dev'], function() {
    var paths = Util.getPaths('src', SOURCE_HTML);
    gulp.src(paths, {
            base: 'src'
        })
        .pipe(htmlInclude())
        .pipe(htmlbeautify())
        // .pipe(rte(':dirname:basename:ext'))
        .pipe(gulp.dest(DEV_DEST_PATH))
});

gulp.task('js-dev', ['clean-dev'], function() {
    var paths = Util.getPaths('src', SOURCE_JS);

    return gulp.src(paths, {
            base: 'src'
        })
        .pipe(browserify())
        .pipe(jsbeautify({
            indentSize: 4
        }))
        .pipe(gulp.dest(DEV_DEST_PATH));
});

gulp.task('css-dev', ['clean-dev', 'image-dev'], function() {
    var streams = [];
    var cssPath;
    var sprites;
    var paths;
    var preSprites;
    for (var i = 0; i < SOURCE_CSS.length; i++) {

        paths = [];
        preSprites = [];

        cssPath = SOURCE_CSS[i];
        sprites = SOURCE_IMG[cssPath];

        paths.push('src' + cssPath);
        preSprites = Util.getPaths(DEV_DEST_PATH, Util.getPathFormObj(sprites));
        paths = paths.concat(preSprites);

        streams.push(
            gulp.src(paths)
            .pipe(concat({
                path: 'src' + cssPath,
                base: 'src'
            }))
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(cssbeautify())
            .pipe(gulp.dest(DEV_DEST_PATH))
        );
    }
    return merge(streams);
});

gulp.task('image-dev', ['clean-dev'], function() {
    var streams = [];
    var classDirs;
    var sourcePath;
    var cssDir;
    var targetCssDir;
    for (var css in SOURCE_IMG) {
        targetCssDir = path.dirname(Util.getPaths('src',css));
        classDirs = SOURCE_IMG[css];
        for (var className in classDirs) {
            sourcePath = Util.getPaths('src', classDirs[className], '/*.png');
            cssDir = Util.getPaths('src',classDirs[className]);
            cssDir = path.relative(targetCssDir,cssDir);
            streams.push(
                gulp.src(sourcePath)
                .pipe(sprite({
                    name: className,
                    style: className + '.css',
                    cssPath: cssDir,
                    prefix: className,
                    processor: 'css'
                }))
                .pipe(gulp.dest(DEV_DEST_PATH + classDirs[className]))
            )
        }
    }

    streams.push(
        gulp.src(['src/**/*.jpg','src/**/*.gif'], {
            base: 'src'
        })
        .pipe(gulp.dest(DEV_DEST_PATH))
    );
    return merge(streams);
});
/////////////////////////////// dev end /////////////////////////////////
/////////////////////////////////////////////////////////////////////////



/////////////////////////////// publish start ////////////////////////////
/////////////////////////////////////////////////////////////////////////
gulp.task('clean-publish', function() {
    del.sync(PUBLISH_DEST_PATH);
});
gulp.task('html-publish', ['clean-publish', 'dev', 'css-publish', 'js-publish'], function() {
    var paths = Util.getPaths(DEV_DEST_PATH, SOURCE_HTML)
    var target = gulp.src(paths, {
            base: DEV_DEST_PATH
        })
       // .pipe(replace(/\.\/images\//g, IMG_BASE_PATH))
       // .pipe(replace(/images\//g, IMG_BASE_PATH))
        .pipe(htmlbeautify())
    return target.pipe(gulp.dest(PUBLISH_DEST_PATH));

});

gulp.task('css-publish', ['clean-publish', 'dev'], function() {
    var paths = Util.getPaths(DEV_DEST_PATH, SOURCE_CSS)

    return gulp.src(paths, {
            base: DEV_DEST_PATH
        })
        .pipe(minifyCSS({
            compatibility: 'ie7'
        }))
        .pipe(replace(CSS_PATH_REG[0],function(){
            if(arguments[1]){
                return IMG_BASE_PATH+arguments[1];
            }
            console.log('css error!');
            return;
        }))
        .pipe(replace(CSS_PATH_REG[1],function(){
            if(arguments[1]){
                return IMG_BASE_PATH+arguments[1];
            }
            console.log('css error!');
            return;
        }))
        .pipe(gulp.dest(PUBLISH_DEST_PATH));
});
gulp.task('js-publish', ['clean-publish', 'dev'], function() {
    var paths = Util.getPaths(DEV_DEST_PATH, SOURCE_JS)

    return gulp.src(paths, {
            base: DEV_DEST_PATH
        })
        .pipe(uglify())
        .pipe(gulp.dest(PUBLISH_DEST_PATH));
});

gulp.task('image-publish', ['clean-publish', 'dev'], function() {
    return gulp.src([DEV_DEST_PATH + '/**/*.jpg', DEV_DEST_PATH + '/**/*.png', DEV_DEST_PATH + '/**/*.gif'], {
            base: DEV_DEST_PATH
        })
        .pipe(gulp.dest(PUBLISH_DEST_PATH));
});

/////////////////////////////// publish end //////////////////////////////
/////////////////////////////////////////////////////////////////////////



////////////////////////////////demo////////////////////////////////////

/**sourcemaps start**/
/**
        .pipe(sourcemaps.init())
        .pipe(concat({path:})) //当uglify作为第一个插件时，会不能正常产生maps，so fall back，让勉强加了一个concat在前面, 解决见https://github.com/floridoo/gulp-sourcemaps/issues/37#issuecomment-60062922
        .pipe(uglify())
        .pipe(sourcemaps.write('./', {
           debug: true
        }))
        //output
        .pipe(gulp.dest(PUBLISH_DEST_PATH));
**/
/**sourcemaps end**/
/////////////////////inject
/**
        if (!IS_CSS_OUT_LINK) {
            target.pipe(inject(gulp.src([PUBLISH_DEST_PATH + '/index.min.css']), {
                starttag: '<!-- inject:css -->',
                transform: function(filePath, file) {
                    console.log(filePath)
                        // return file contents as string
                    return '<style>' + file.contents.toString('utf8') + '</style>'
                }
            }));
        }

        //类似插件gulp-smoosher；
        if (!IS_JS_OUT_LINK) {
            target.pipe(inject(gulp.src([PUBLISH_DEST_PATH + '/index.min.js']), {
                starttag: '<!-- inject:js -->',
                transform: function(filePath, file) {
                    console.log(filePath)
                        // return file contents as string
                    return '<script>' + file.contents.toString('utf8') + '</script>';
                }
            }));
        }

        return target.pipe(gulp.dest(PUBLISH_DEST_PATH));
 **/
