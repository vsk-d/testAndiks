var gulp 		= require('gulp'),
	jade 		= require('gulp-jade'),
	sass 		= require('gulp-sass'),
	rename 		= require('gulp-rename'),
	prefix 		= require('gulp-autoprefixer'),
	useref 		= require('gulp-useref'),
	uglify 		= require('gulp-uglify'),
	clean 		= require('gulp-clean'),
	gulpif 		= require('gulp-if'),
	filter 		= require('gulp-filter'),
	size 		= require('gulp-size'),
	imagemin 	= require('gulp-imagemin'),
	concatCss	= require('gulp-concat-css'),
	minifyCss 	= require('gulp-minify-css'),
	browserSync = require('browser-sync'),
	wiredep 	= require('wiredep').stream,
	reload 		= browserSync.reload;



// ====================================================
// ====================================================
// ============== Локальная разработка APP ============

//jade
gulp.task('jade', function() {
		gulp.src('app/templates/*.jade')
		.pipe(jade({ pretty: true }))
		.on('error', log)
		.pipe(gulp.dest('app/'))
		.pipe(reload({stream: true}));
});

// css
gulp.task('css', function() {
		gulp.src('app/scss/main.scss')
		.pipe(sass())
		.on('error', log)
		.pipe(prefix('last 2 versions','>1%','ie 7'))
		.pipe(rename('main.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(reload({stream: true}));
});

// Подключаем ссылки на bower components
gulp.task('wiredep', function () {
	gulp.src('app/templates/common/*.jade')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest('app/templates/common/'));
});

// Запускаем локальный сервер (только после компиляции jade)
gulp.task('server', ['jade'], function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

// слежка и запуск задач
gulp.task('watch', function () {
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch('app/templates/**/*.jade', ['jade']);
	gulp.watch('app/scss/**/*.scss',['css']);
	gulp.watch([
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', reload);
});

// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);




// ====================================================
// ====================================================
// ================= Сборка DIST ======================

// Очистка папки
gulp.task('clean', function () {
	return gulp.src('dist')
		.pipe(clean());
});

// Переносим HTML, CSS, JS в папку dist
gulp.task('useref', function () {
	var assets = useref.assets();
	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

// Перенос шрифтов
gulp.task('fonts', function() {
	gulp.src('app/fonts/**/*')
		// .pipe(filter(['*.eot','*.svg','*.ttf','*.otf','*.woff','*.woff2']))
		.pipe(gulp.dest('dist/fonts/'))
});

// Картинки
gulp.task('images', function () {
	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/img'));
});

// Остальные файлы, такие как favicon.ico и пр.
gulp.task('extras', function () {
	return gulp.src([
		'app/*.*',
		'!app/*.html'
	]).pipe(gulp.dest('dist'));
});

// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
	return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// Собираем папку DIST (только после компиляции Jade)
gulp.task('build', ['clean', 'jade', 'css'], function () {
	gulp.start('dist');
});

// Проверка сборки
gulp.task('server-dist', function () {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'dist'
		}
	});
});



// ====================================================
// ====================================================
// ===================== Функции ======================

// Более наглядный вывод ошибок
var log = function (error) {
	console.log([
		'',
		"----------ERROR MESSAGE START----------",
		("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		"----------ERROR MESSAGE END----------",
		''
	].join('\n'));
	this.end();
};
