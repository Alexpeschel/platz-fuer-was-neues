"use strict";

var   gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
 minifyCss = require('gulp-clean-css'),
     pages = require('gulp-gh-pages'),
 svgSprite = require('gulp-svg-sprites');

var options = {
    src: './src/',
    dist: './dist/'
};

gulp.task('compileSass', function() {
  return gulp.src(options.src + "scss/main.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + 'css'));
});

gulp.task('html', ['compileSass'], function() {
  return gulp.src(options.src + 'index.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest(options.dist));
});

gulp.task('watchFiles', function() {
  gulp.watch(options.src + 'scss/**/*.scss', ['compileSass']);
});

gulp.task('sprites', function () {
    return gulp.src(options.src + 'img/assets/**/*.svg')
        .pipe(svgSprite({
          mode: "defs",
          preview: false
        }))
        .pipe(gulp.dest(options.src + "img"));
});


gulp.task('assets', function() {
  return gulp.src([options.src + "index.html",
                   options.src + "contactengine.php",
                   options.src + "impressum.html",
                   options.src + "kontakt.html",
                   options.src + "img/**/*"], { base: options.src})
              .pipe(gulp.dest(options.dist));
});

gulp.task("serve", ['compileSass', 'watchFiles']);

gulp.task('clean', function() {
  del([options.dist]);
  // delete compiles css and map
  del([options.src + 'css/main.css*']);
});

gulp.task("build", ['html', 'assets']);

gulp.task('deploy', function() {
  return gulp.src(options.dist + '/**/*')
             .pipe(pages());
});

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
