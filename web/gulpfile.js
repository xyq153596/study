let browserSync = require("browser-sync").create();
let gulp = require("gulp");
let sass = require("gulp-sass");
let watch = require("gulp-watch");
let concat = require("gulp-concat");
let minicss = require("gulp-clean-css");
let rename = require("gulp-rename");
let fileInclude = require('gulp-file-include');
let reload = browserSync.reload;

/*----调试-----*/
gulp.task("init", ["sass","htmlInclude"], () => {
  browserSync.init({
    server: {
      baseDir: "dist/html" //初始路径
    }
  });
  gulp.watch("resource/sass/**/*.scss",["sass"]);
  gulp.watch("view/!(common)/*.html",["htmlInclude"]);
  gulp.watch("dist/html/**/*.html").on("change",reload);
})
/*---合并html----*/
gulp.task("htmlInclude", () => {
  gulp.src("view/!(common)/*.html")
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/html'));
});

/*-----sass处理-----*/
gulp.task("sass", () => {
  gulp.src("resource/sass/**/*.scss")
    .pipe(sass()) //转化
    .pipe(minicss()) //压缩
    .pipe(rename({
      suffix: ".min"
    })) //重命名
    .pipe(gulp.dest("dist/css"))
})



gulp.task("build", ["htmlInclude", "sass"]);