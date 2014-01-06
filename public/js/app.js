'use strict';

angular.element(document).ready(function () {

  angular.module('recrecords', [
    'ngAnimate',
    'ngRoute',
    'recrecords.filters',
    'recrecords.services',
    'recrecords.directives',
    'recrecords.controllers'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/home', {templateUrl: '/partials/home.html', controller: 'home'});
    $routeProvider.when('/artist/:slug', {templateUrl: '/partials/artist.html', controller: 'artist'});
    $routeProvider.when('/release/:slug', {templateUrl: '/partials/release.html', controller: 'release'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);

  angular.bootstrap(document, ['recrecords']);

});