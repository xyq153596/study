let browserSync = require("browser-sync").create();
let gulp = require("gulp");
let sass = require("gulp-sass");
let watch = require("gulp-watch");
let concat = require("gulp-concat");
let minicss = require("gulp-clean-css");
let rename = require("gulp-rename");
let fileInclude = require('gulp-file-include');
let uglify = require('gulp-uglify');
let reload = browserSync.reload;

/*----调试-----*/
gulp.task("init", ["css", "html", "js"], () => {
  browserSync.init({
    server: {
      baseDir: "dist/" //初始路径
    }
  });

  gulp.watch(["dist/**"]).on("change", (file) => {
    console.log("重新加载", file.path);
    reload();
  });


})
/*---合并html----*/
gulp.task("html", () => {
  gulp.src(["view/*.html"])
    .pipe(watch("view/**/*.html"))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/html'));
});

/*-----sass处理-----*/
gulp.task("css", () => {
  let filePath = "resource/sass/**/*.scss";
  gulp.src(filePath)
    .pipe(watch(filePath))
    .pipe(sass()) //转化
    .pipe(minicss()) //压缩
    .pipe(rename({
      suffix: ".min"
    })) //重命名
    .pipe(gulp.dest("dist/css"))
})

gulp.task("js", () => {
  gulp.src("resource/js/**/*.js")
    .pipe(watch("resource/js/**/*.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
});


gulp.task("build", ["html", "css", "js"]);