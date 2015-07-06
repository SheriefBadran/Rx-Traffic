var gulp = require('gulp');
var traceur = require('gulp-traceur');
var $ = require('gulp-load-plugins')();

gulp.task('default', function() {
  return gulp.src('./app/js/*.js')
    .pipe($.traceur({
      asyncFunctions: true
    }))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/dist/traceur'));

});

