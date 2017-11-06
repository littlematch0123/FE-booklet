var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var merge = require('gulp-merge-link');
var connect = require('gulp-connect');
var htmlmin = require('gulp-htmlmin');


gulp.task('merge0', function () {
  return gulp.src(['_book/*.html'])
    .pipe(merge({
      'base.css': ['**/*.css'],
      'base.js': ['**/*.js'],
    }))
    .pipe(gulp.dest('dist'));
});
gulp.task('merge1',function () {
    return gulp.src(['_book/HTML/**/*.html'])
      .pipe(merge({
        '../base.css': ['../**/*.css'],
        '../base.js': ['../**/*.js'],
        '../../base.css': ['../../**/*.css'],
        '../../base.js': ['../../**/*.js'],
        '../../../base.css': ['../../../**/*.css'],
        '../../../base.js': ['../../../**/*.js']             
      }))
      .pipe(gulp.dest('dist/HTML'));

});
gulp.task('merge2', function () {
  return gulp.src(['_book/CSS/**/*.html'])
    .pipe(merge({
      '../base.css': ['../**/*.css'],
      '../base.js': ['../**/*.js'],
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
      '../../../base.css': ['../../../**/*.css'],
      '../../../base.js': ['../../../**/*.js']      
    }))
    .pipe(gulp.dest('dist/CSS'));

});

gulp.task('move',function(){
  gulp.src('_book/search_plus_index.json')
  .pipe(gulp.dest('dist'));
  gulp.src('_book/gitbook/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
  gulp.src('_book/gitbook/images/*')
    .pipe(gulp.dest('dist/gitbook/images'))     
});
gulp.task('concat',function(){
  gulp.src('_book/**/*.js')
    .pipe(concat('base.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
  gulp.src('_book/**/*.css')
    .pipe(concat('base.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
});
gulp.task('html', ['move','merge0', 'merge1', 'merge2', 'concat'],function () {
  var options = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
  };  
  return gulp.src('dist/**/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'));
});
gulp.task('connect', ['html'],function () {
  connect.server();
});
gulp.task('default', [ 'connect']);