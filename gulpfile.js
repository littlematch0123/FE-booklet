var gulp = require('gulp');
var qiniu = require('gulp-qiniu');

gulp.task('img', function () {
  gulp.src('./dist/img/*')
    .pipe(qiniu({
      accessKey: "i2uHNRabCHrMdWtb6HNkPZyqmEgzom-4hoJmJzu4",
      secretKey: "MSwXbRXpGOBct538vaJfvqSDcTFaDBUq5UN64n9h",
      bucket: "picture",
      zone:"Zone_z1"
    }))
});