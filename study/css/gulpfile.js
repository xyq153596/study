const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload;

gulp.task('b', () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    })
    gulp.watch('./app/**/*').on('change', reload);
})
