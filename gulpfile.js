var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

gulp.task('compress', function () {
  gulp.src([
    'public/bower_components/jquery/jquery.min.js',
    'public/bower_components/angular/angular.min.js',
    'public/bower_components/angular-animate/angular-animate.min.js',
    'public/bower_components/angular-route/angular-route.min.js',
    'public/bower_components/soundmanager/script/soundmanager2-jsmin.js',
    'public/bower_components/underscore/underscore.js',
    'public/js/controllers.js',
    'public/js/directives.js',
    'public/js/filters.js',
    'public/js/services.js',
    'public/js/app.js'
  ])
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest('public/js'));
});