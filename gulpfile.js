var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
gulp.task('img', function () {
  gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));

});

gulp.task('default',['img']);