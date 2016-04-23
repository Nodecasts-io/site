const gulp     = require('gulp')
const uglify   = require('gulp-uglify')
const concat   = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')

gulp.task('default', ['minify-js', 'minify-css'], () => {})

gulp.task('minify-js', () => {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/bundle'))
})

gulp.task('minify-css', () => {
  return gulp.src('public/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('public/bundle'))
})
