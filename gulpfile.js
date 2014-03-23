var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

gulp.task('compress', function () {
  gulp.src([
    'public/bower_components/jquery/jquery.js',
    'public/bower_components/angular/angular.js',
    'public/bower_components/angular-animate/angular-animate.js',
    'public/bower_components/angular-route/angular-route.js',
    'public/bower_components/soundmanager/script/soundmanager2.js',
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