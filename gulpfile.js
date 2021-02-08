const gulp = require('gulp')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')

gulp.task('server', () => {
    browserSync({
        server: {
            baseDir: 'dist',
        },
    })

    gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('styles', () => {
    return gulp
        .src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})

gulp.task('watch', () => {
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'))
    gulp.watch('src/*.html').on('change', gulp.parallel('html'))
    gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'))
    gulp.watch('src/fonts/**/*').on('all', gulp.parallel('fonts'))
    gulp.watch('src/mailer/**/*').on('all', gulp.parallel('mailer'))
    gulp.watch('src/pages/**/*').on('all', gulp.parallel('pages'))
    gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'))
    gulp.watch('src/img/**/*').on('all', gulp.parallel('images'))
})

gulp.task('html', () => {
    return gulp
        .src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('scripts', () => {
    return gulp
        .src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
})

gulp.task('fonts', () => {
    return gulp
        .src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream())
})

gulp.task('mailer', () => {
    return gulp
        .src('src/mailer/**/*')
        .pipe(gulp.dest('dist/mailer'))
        .pipe(browserSync.stream())
})

gulp.task('pages', () => {
    return gulp
        .src('src/pages/**/*')
        .pipe(gulp.dest('dist/pages'))
        .pipe(browserSync.stream())
})

gulp.task('icons', () => {
    return gulp
        .src('src/icons/**/*')
        .pipe(gulp.dest('dist/icons'))
        .pipe(browserSync.stream())
})

gulp.task('images', () => {
    return gulp
        .src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream())
})

gulp.task(
    'default',
    gulp.parallel(
        'watch',
        'server',
        'styles',
        'scripts',
        'fonts',
        'icons',
        'html',
        'images',
        'mailer',
        'pages'
    )
)
