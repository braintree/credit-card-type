'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

var config = {
  src: {
    js: {
      all: './src/**/*.js',
      main: './index.js',
      watch: './**/*.js',
      output: 'app.built.js',
      min: 'app.built.min.js'
    }
  },
  options: {
    standalone: 'creditCardType'
  },
  dist: {js: 'dist/js'}
};

function js() {
  return browserify(config.src.js.main, config.options)
    .bundle()
    .pipe(source(config.src.js.output))
    .pipe(streamify(size()))
    .pipe(gulp.dest(config.dist.js))
    .pipe(streamify(uglify()))
    .pipe(streamify(size()))
    .pipe(rename(config.src.js.min))
    .pipe(gulp.dest(config.dist.js));
}

function watch() {
  return gulp.series(js, function watchJS() {
    gulp.watch(config.src.js.watch, js);
  });
}

function clean() {
  return del([config.dist.js]);
}

function build() {
  return gulp.series(clean, js);
}

exports.js = js();
exports.watch = watch();
exports.clean = clean();
exports.build = build();
