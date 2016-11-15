var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

plugins.sass = require('gulp-sass');
plugins.useref = require('gulp-useref');
plugins.uglify = require('gulp-uglify');
plugins.gulpIf = require('gulp-if');
plugins.cssnano = require('gulp-cssnano');
plugins.runSequence = require('run-sequence');
plugins.browserSync = require('browser-sync').create();
plugins.del = require('del');
plugins.sass = require('gulp-sass');
plugins.nunjucksRender = require('gulp-nunjucks-render');
plugins.gutil = require('gulp-util');
plugins.removeCode = require('gulp-remove-code');

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task('sass', getTask('sass'));
gulp.task('browserSync', getTask('browserSync'));
gulp.task('clean:dist', getTask('clean'));
gulp.task('nunjucks', getTask('nunjucks'));
gulp.task('useref', getTask('useref'));
gulp.task('indexcleanup', getTask('indexcleanup'));
gulp.task('sass-build', getTask('sass-build'));


gulp.task('jsload', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('.tmp/js'))
    .pipe(plugins.browserSync.reload({
      stream: true
    }))
});


gulp.task('watch', ['browserSync', 'sass', 'nunjucks'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['nunjucks']);
  gulp.watch('app/js/**/*.js',['jsload']);
});

gulp.task('default', function (callback) {
  plugins.runSequence(['sass','jsload','nunjucks', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function (callback) {
  plugins.runSequence('clean:dist',
    ['sass-build','nunjucks'],'useref','indexcleanup',
    callback
  )
})
