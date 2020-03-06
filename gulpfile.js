const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browser = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	del = require('del');

// BrowserSync
function browserSync(done) {
	browser.init({
		server: {
			baseDir: "app"
		},
		notify: false,
	});
	done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browser.reload();
	done();
}

// Sass|Scss Styles
function styles() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss({
			level: {
				1: {
					specialComments: 0
				}
			}
		}))
		.pipe(gulp.dest('app/css'));
	// .pipe(browserSync.stream())
}

// JS
function scripts() {
	return gulp.src([
			'app/js/common.js'
		])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
}

function watch() {
	gulp.watch('app/scss/**/*.scss', gulp.series(styles, browserSyncReload));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.series(scripts, browserSyncReload));
	gulp.watch('app/*.html', gulp.series(browserSyncReload));
}

exports.styles = gulp.parallel(styles);
exports.default = gulp.parallel(watch, browserSync);