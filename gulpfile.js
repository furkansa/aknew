var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');

gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('views',function buildHTML(){
	return gulp.src('app/views/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('app'))
  .pipe(gulp.dest('dist'))
});

gulp.task('browserSync',function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('concatJS',function(){
  return gulp.src('app/js/**/*.js')
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/'))
});

gulp.task('concatCss', function() {
    return gulp.src('app/css/**/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/'))
  });


gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
});

gulp.task('watch',['browserSync','sass','views'],function(){
	gulp.watch('app/sass/**/*.sass',['sass']);
	gulp.watch('app/views/**/*.pug',['views']);
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**.*.js',browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['cache:clear','sass','views','images', 'fonts','concatCss','concatJS'],
    callback
  )
});