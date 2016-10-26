"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('default', ['lint', 'sass', 'watch']);

gulp.task('lint', function() {
  return gulp.src(['./client/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function() {}
  );
});

gulp.task('sass', function() {
  return gulp.src('./client/sass/*.scss')
    // sourcemaps + sass + error handling
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceComments: true,
      outputStyle: 'compressed'  // nested || compressed
    }))
    .on('error', function () {})
    // generate .maps
    .pipe(sourcemaps.write({
      'includeContent': false,
      'sourceRoot': '.'
    }))
    .pipe(sourcemaps.write({
      'includeContent': true
    }))
    // write sourcemaps to a specific directory
    // give it a file and save
    .pipe(gulp.dest('./client/styles'));
});

gulp.task('watch', function() {
  gulp.watch(['./client/app/**/*.js'], ['lint']);
  gulp.watch('./client/sass/**/*.scss', ['sass']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});
