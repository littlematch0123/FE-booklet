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
gulp.task('merge3', function () {
  return gulp.src(['_book/JS/**/*.html'])
    .pipe(merge({
      '../base.css': ['../**/*.css'],
      '../base.js': ['../**/*.js'],
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
      '../../../base.css': ['../../../**/*.css'],
      '../../../base.js': ['../../../**/*.js']
    }))
    .pipe(gulp.dest('dist/JS'));
});
gulp.task('merge4', function () {
  return gulp.src(['_book/HTTP/**/*.html'])
    .pipe(merge({
      '../base.css': ['../**/*.css'],
      '../base.js': ['../**/*.js'],
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
      '../../../base.css': ['../../../**/*.css'],
      '../../../base.js': ['../../../**/*.js']
    }))
    .pipe(gulp.dest('dist/HTTP'));
});
gulp.task('merge5', function () {
  return gulp.src(['_book/utils/**/*.html'])
    .pipe(merge({
      '../base.css': ['../**/*.css'],
      '../base.js': ['../**/*.js'],
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
      '../../../base.css': ['../../../**/*.css'],
      '../../../base.js': ['../../../**/*.js']
    }))
    .pipe(gulp.dest('dist/utils'));
});
gulp.task('merge6', function () {
  return gulp.src(['_book/FELib/**/*.html'])
    .pipe(merge({
      '../base.css': ['../**/*.css'],
      '../base.js': ['../**/*.js'],
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
      '../../../base.css': ['../../../**/*.css'],
      '../../../base.js': ['../../../**/*.js']
    }))
    .pipe(gulp.dest('dist/FELib'));
});
gulp.task('merge7', function () {
  return gulp.src(['_book/BE/**/*.html'])
    .pipe(merge({
      '../base.css': ['../**/*.css'],
      '../base.js': ['../**/*.js'],
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
      '../../../base.css': ['../../../**/*.css'],
      '../../../base.js': ['../../../**/*.js']
    }))
    .pipe(gulp.dest('dist/BE'));
});
gulp.task('merge8', function () {
  return gulp.src(['_book/mobile/**/*.html'])
    .pipe(merge({
      '../base.css': ['../**/*.css'],
      '../base.js': ['../**/*.js'],
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
      '../../../base.css': ['../../../**/*.css'],
      '../../../base.js': ['../../../**/*.js']
    }))
    .pipe(gulp.dest('dist/mobile'));
});
gulp.task('merge9', function () {
  return gulp.src(['_book/optimize/**/*.html'])
    .pipe(merge({
      '../base.css': ['../**/*.css'],
      '../base.js': ['../**/*.js'],
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
      '../../../base.css': ['../../../**/*.css'],
      '../../../base.js': ['../../../**/*.js']
    }))
    .pipe(gulp.dest('dist/optimize'));
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
gulp.task('html', ['move', 'merge0', 'merge1', 'merge2', 'merge3', 'merge4', 'merge5', 'merge6', 'merge7', 'merge8', 'merge9','concat'],function () {
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