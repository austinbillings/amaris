// Deps ========================================================================
const bower = require('bower-files')();
const exec = require('child_process').exec;
const path = require('path');
const zaq = require('zaq');
const chalk = require('chalk');
const merge = require('merge-stream');
const gulp = require('gulp');
const sass = require('gulp-sass');
const less = require('gulp-less');
const copy = require('gulp-copy');
const babel = require('gulp-babel');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const uglifyCSS = require('gulp-uglifycss');
const open = require('open');

const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');

// Fns =========================================================================
let abs = (path) => `./${path}`;
let sniff = (base, type) => `./${base}/**/*.${type ? type : base}`;


// Config  =====================================================================
const port = 5111;
const assetDir = 'assets';
const outputDir = abs('dist');
const bowerDir = abs('bower_components/');

// Sourcing ====================================================================

let sources = {
	app: [sniff('js') ],
	sass: [ sniff('scss') ],
	photos: [ sniff(assetDir, 'jpg') ],
	images: [
		sniff(assetDir, 'jpg'),
		sniff(assetDir, 'png'),
		sniff(assetDir, 'gif'),
		sniff(assetDir, 'svg')
	],
	vendor: {
		js: [
			...bower.ext('js').files,
			sniff('lib', 'js')
		],
		css: [
			...bower.ext('css').files,
			sniff('lib', 'css')
		],
		less: [
			...bower.ext('less').files,
			sniff('lib', 'less')
		],
		fonts: [
			`${bowerDir}/bootstrap/fonts/*`,
			`${bowerDir}/font-awesome/fonts/*`,
			abs(`ui/**/fonts/*`)
		],
	}
};

// Tasks =======================================================================
gulp.task('js-lib', () => {
    gulp.src(sources.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(outputDir));
});

gulp.task('fonts-lib', () => {
  gulp.src(sources.vendor.fonts)
    .pipe(copy(outputDir + '/fonts', {prefix: 4}));
});

gulp.task('css-lib', () => {
  var unprocessed = gulp.src(sources.vendor.css);
  var processed = gulp.src(sources.vendor.less).pipe(less({ paths: [ path.join(__dirname, 'less', 'includes')] }))
    .pipe(replace(/url\('[^\']*fonts\//gi, 'url(\'fonts/'));
  merge(unprocessed, processed)
    .pipe(concat('vendor.css'))
    .pipe(uglifyCSS({uglyComments: true, maxLineLen: 500}))
    .pipe(gulp.dest(outputDir));
});

gulp.task('app', () => {
	zaq.info('Compiling JS. . .');
	gulp.src(sources.app)
		.pipe(concat('app.js'))
		.pipe(babel({presets: ['env']}))
		.pipe(gulp.dest(outputDir));
});

gulp.task('sass', () => {
	zaq.info('Compiling Sass. . .');
	gulp.src(sources.sass)
		.pipe(concat('ui.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(outputDir));
});


gulp.task('thumbs', () => {
	zaq.info('Making thumbnails. . .');
	var thumbFilter = filter(['**', '!**/*-thumb.jpg']);
	gulp.src(sources.photos)
		.pipe(thumbFilter)
		.pipe(imageResize({ height: 400 }))
		.pipe(rename({ suffix: '-thumb' }))
		.pipe(gulp.dest((path) => {
			return path.base;
		}));
});

gulp.task('serve', () => {
	exec(`asdf -p ${port}`, (err, stdout, stderr) => ''); // swallow everthing ;)
	open(`http://localhost:${port}`)
	zaq.info(`Static server starting on :${port}. . .`);
});

gulp.task('optimize', () => {
  gulp.src(sources.images)
    .pipe(imagemin())
    .pipe(gulp.dest((path) => path.base));
});

gulp.task('deps', ['js-lib','fonts-lib','css-lib']);

gulp.task('live', () => {
	zaq.info(`Watching ${chalk.bold('./scss')} for Sass file changes. . .`);
	gulp.watch(sources.sass, ['sass']);
	zaq.info(`Watching ${chalk.bold('./js')} for app file changes. . .`);
	gulp.watch(sources.app, ['app']);
})

gulp.task('default', ['serve', 'live']);
