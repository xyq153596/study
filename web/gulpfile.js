let gulp = require("gulp");
let browserSync = require("browser-sync").create();
let sass = require("gulp-sass");
let reload = browserSync.reload;
let fileInclude  = require('gulp-file-include');

gulp.task("browser-sync",()=>{
  browserSync.init({
    server:{
      baseDir:"./"//初始路径
    }
  });
});

gulp.task("htmlInclude",()=>{
  gulp.src("view/**/*.html").pipe(fileInclude({
    prefix:'@@',
    basepath:'@file'
  })).pipe(gulp.dest('dist'));
});