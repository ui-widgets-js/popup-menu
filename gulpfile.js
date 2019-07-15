const gulp = require('gulp');
const lint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src([ './popup-menu-item.js', 'popup-menu-position.js', 'popup-menu.js' ])
    .pipe(lint({ configFile: 'eslint.json' }))
    .pipe(lint.format())
    .pipe(lint.failAfterError());
});