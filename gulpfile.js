var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var reactify = require('reactify');
var babelify = require('babelify');
var less = require('gulp-less');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browserify', function() {
  gulp.src('public/src/main.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      debug: true,
      transform: ['babelify'],
      extensions: ['.jsx', '.js']
    }))
    .on('error', swallowError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('less', function() {
  return gulp.src('resources/assets/less/main.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['browserify', 'less']);

gulp.task('watch', function() {
  gulp.watch(['public/src/**/*.*', 'resources/assets/less/**/*.*'], ['default']);
});

function swallowError(error) {
  console.log(error.toString());

  this.emit('end');
}
