'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var server = require('browser-sync');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var atImport = require('postcss-import');
var del = require('del');
var runSequence = require('run-sequence');
var normalize = require('postcss-normalize');
var uglify = require('gulp-uglify');
var size = require('gulp-filesize');
var rename = require('gulp-rename');
var csso = require('gulp-csso');

gulp.task('html', function() {
  return gulp.src('src/*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('build'))
    .pipe(size())
    .pipe(server.reload({stream: true}));
});

gulp.task('style', function() {
  return gulp.src('src/css/style.css')
    .pipe(postcss([
      atImport(),
      normalize(),
      cssnext()
    ]))
    .pipe(size())
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(size())
    .pipe(server.reload({stream: true}));
});

gulp.task('js', function() {
  return gulp.src('src/js/app.js')
    // .pipe(uglify())
    .pipe(gulp.dest('build'))
    .pipe(size())
    .pipe(server.reload({stream: true}));
});

gulp.task('clean', function() {
  return del('build/**/*');
});

gulp.task('build', function() {
  runSequence('clean', ['html', 'style', 'js']);
});

gulp.task('serve', function() {
  server.init({
    server: 'build',
    notify: false,
    open: false,
    ui: false
  });
  gulp.watch('src/*.pug', ['html']);
  gulp.watch('src/css/*.css', ['style']);
  gulp.watch('src/js/app.js', ['js']);
});
