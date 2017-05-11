let gulp = require("gulp");
let browserSync = require("browser-sync").create();
let sass = require("gulp-sass");
let reload = browserSync.reload;

gulp.task("browser-sync",()=>{
  browserSync.init({
    server:{
      baseDir:"./"//初始路径
    }
  });
});