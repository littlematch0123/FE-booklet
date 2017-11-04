var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
gulp.task('img', function () {
  gulp.src('img/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('dist/img'));

});

gulp.task('default',['img']);