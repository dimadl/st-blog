"use strict";

var path = {
    build: {
        html:  'build/',
        js:    'build/js/',
        css:   'build/css/',
        img:   'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html:  'src/*.html',
        js:    'src/js/main.js',
        style: 'src/style/main.scss',
        img:   'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html:  'src/**/*.html',
        js:    'src/js/**/*.js',
        css:   'src/style/**/*.scss',
        img:   'src/img/**/*.*',
        fonts: 'srs/fonts/**/*.*'
    },
    clean:     './build'
};

var config = {
    server: {
        baseDir: './build'
    },
    notify: false
};

var gulp = require('gulp'),
    webserver = require('browser-sync'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    cleanBuild = require('del');;

gulp.task('webserver', function () {
  webserver(config);
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
      .pipe(plumber())
      .pipe(rigger())
      .pipe(gulp.dest(path.build.html))
      .pipe(webserver.reload({stream:true}))
});

gulp.task('css:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({stream: true}));
});

gulp.task('clean:build', function () {
    cleanBuild.sync(path.clean);
});

gulp.task('build', [
    'clean:build',
    'html:build',
    'css:build'
]);

gulp.task('watch', function() {
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.css, ['css:build']);
    gulp.watch(path.watch.js, ['js:build']);
});

gulp.task('default', [
    'build',
    'webserver',
    'watch'
]);
