const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const browserify = require('browserify');
const watchify = require('watchify');

function compile(watchParam) {
  const bundler = watchify(
    browserify('./public/src/main.js',
    { debug: false, extensions: ['.js', '.jsx'] })
    .transform(
      babelify.configure({
        presets: ['es2015', 'react'],
        extensions: ['.js', '.jsx'],
      })
    )
  );

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist'));
  }

  if (watchParam) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
