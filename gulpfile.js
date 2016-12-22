var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var runSequence = require('gulp-run-sequence');
var del = require('del');
var exec = require('child_process').exec;
var BASE_DEST_FOLDER = 'release/mg-personal';

gulp.task('default', ['run']);

gulp.task('run', function () {
    runSequence(
        'build-clean',
        'copy-files', ['gen-app-js', 'gen-lib-css', 'css-fonts', 'gen-lib-js', 'gen-less', 'gen-lib-maps'],
        'serve',
        'watch'
    );
});

gulp.task('serve', function (cb) {

    // Use a standard node process in
    if(gutil.env.fail_on_crash) {
        exec('node release/mg-personal/server.js', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    } else {

        // Use nodemon on local for better developer workflow
        return nodemon({
            script: BASE_DEST_FOLDER + '/server.js',
            ext: 'js',
            env: {
                PORT: 3000,
                ENV: 'LOCAL'
            }
        })
            .on('restart', function() {
                console.log('Server restarting...');
            });
    }
});

gulp.task('watch', function () {
    return gulp.watch([
        'source/**/*'
    ], ['rebuild']);
});

gulp.task('rebuild', function () {
    runSequence(
        'build-clean',
        'copy-files', ['gen-app-js', 'gen-lib-css', 'css-fonts', 'gen-lib-js', 'gen-less', 'gen-lib-maps']
    );
});

gulp.task('test', function (done) {
    new server({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('build-clean', function (cb) {
    return del([
        BASE_DEST_FOLDER
    ], cb);
});

/****************************
 COPY FILES
 ****************************/

gulp.task('copy-files', function () {
    return gulp.src([
        'source/**/*'
    ])
        .pipe(gulp.dest(BASE_DEST_FOLDER));
});

/****************************
 GENERATING FILES
 ****************************/

gulp.task('gen-less', function () {
    return gulp.src([
        'source/public/assets/css/*.less'
    ])
        .pipe(plumber())
        .pipe(less())
        .pipe(plumber.stop())
        .pipe(gulp.dest(BASE_DEST_FOLDER + '/public/assets/css'));
});

gulp.task('gen-lib-maps', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
        'node_modules/angular-route/angular-route.min.js.map'
    ])
        .pipe(gulp.dest(BASE_DEST_FOLDER + '/public'));
});

gulp.task('gen-lib-css', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/c3/c3.min.css'
    ])
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest(BASE_DEST_FOLDER + '/public'));
});

gulp.task('css-fonts', function () {
    return gulp.src([
        'node_modules/font-awesome/fonts/**.*'
    ])
        .pipe(gulp.dest(BASE_DEST_FOLDER + '/public/fonts'));
});

gulp.task('gen-lib-js', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/angular/angular.min.js',
        'node_modules/c3/c3.min.js',
        'node_modules/d3/d3.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/angular-clipboard/angular-clipboard.js',
        'node_modules/noty/js/noty/packaged/jquery.noty.packaged.min.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/lodash/lodash.js',
        'node_modules/jspdf/dist/jspdf.min.js',
        'node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js'
    ])
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest(BASE_DEST_FOLDER + '/public'));
});

gulp.task('gen-app-js', function () {
    return gulp.src([
        'source/public/services/*.js',
        'source/public/factories/*.js',
        'source/public/directives/directives.js',
        'source/public/filters/filters.js',
        'source/public/index.js',
        'source/public/modules/**/*.js',
        'source/public/modules/**/!.test.js',
        'source/public/model/*.js'
    ])
        .pipe(concat('app.js'))
        //.pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(BASE_DEST_FOLDER + '/public'));
});