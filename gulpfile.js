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
       kss = require('gulp-kss'),
     clean = require('gulp-clean');

var options = {
    src: 'src',
    dist: 'dist'
};


gulp.task('compileSass', function() {
  return gulp.src(options.src + "/scss/main.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + '/css'));
});



gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
});

gulp.task('clean', function() {
  del(['dist', options.src + '/css/main.css*', options.src + 'js/main*.js*']);
});

gulp.task('html', ['compileSass'], function() {
  return gulp.src(options.src + '/index.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulp.dest(options.dist));
});

gulp.task("build", ['html'], function() {
  return gulp.src([options.src + "css/app.min.css", options.src + "js/app.min.js", options.src + "index.html", options.src + "contactengine.php", options.src + "impressum.html", options.src + "kontakt.html", options.src + "img/**/*"], { base: './'})
             .pipe(gulp.dest('dist'));
});

gulp.task("serve", ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
