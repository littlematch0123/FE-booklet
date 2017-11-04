var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var merge = require('gulp-merge-link');
var connect = require('gulp-connect');
var htmlmin = require('gulp-htmlmin');



gulp.task('merge1',function () {
  return gulp.src(['_book/HTML/**/*.html'])
    .pipe(merge({
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
    }))
    .pipe(gulp.dest('dist/HTML')); 

});
gulp.task('merge2',function () {
  return gulp.src(['_book/*.html'])
    .pipe(merge({
      'base.css': ['**/*.css'],
      'base.js': ['**/*.js'],
    }))
    .pipe(gulp.dest('dist'));     
});

gulp.task('move',function(){
  gulp.src('_book/search_plus_index.json')
  .pipe(gulp.dest('dist'));
  gulp.src('_book/gitbook/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
  gulp.src('_book/gitbook/images/*')
    .pipe(gulp.dest('dist/gitbook/images'))  
  gulp.src('./icon/*')
    .pipe(gulp.dest('dist/icon'))      
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
gulp.task('html',['merge1','merge2'],function () {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };  
  gulp.src('dist/**/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'));
});
gulp.task('connect', function () {
  connect.server();
});
gulp.task('default',['html','concat','move','connect']);