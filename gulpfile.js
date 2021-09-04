const { src, dest, watch, parallel, series } = require('gulp');

const browserSync = require('browser-sync').create();
const scss = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-html-minifier-terser');
const concat = require('gulp-concat');
const fileInclude = require('gulp-file-include');

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: 'build/',
    },
    notify: false,
  });
};

const watching = () => {
  watch(['app/style-map/*.html']).on('change', browserSync.reload);
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/**/*.html'], html);
  watch(['app/js/index.js', '!app/js/index.min.js', '!app/js/index.min.js.map'], scripts);
};

const styles = () => {
  return src('app/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true,
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(['app/js/index.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
};

const html = () => {
  return src(['app/*.html', '!app/parts/**/*.html'])
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file',
      }),
    )
    .pipe(dest('./build'))
    .pipe(browserSync.stream());
};

const htmlMin = () => {
  return src('build/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build/'));
};

const toBuild = () => {
  return src(['app/fonts/**/*', 'app/images/**/*', 'app/style-map/**/*'], {
    base: 'app',
  }).pipe(dest('build'));
};

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.htmlMin = htmlMin;
exports.html = html;

exports.default = series(parallel(styles, scripts, html, toBuild), parallel(browsersync, watching));
