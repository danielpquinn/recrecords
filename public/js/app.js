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
    $routeProvider.when('/releases/page/:page', {templateUrl: '/partials/releases.html', controller: 'releases'});
    $routeProvider.when('/artist/:slug', {templateUrl: '/partials/artist.html', controller: 'artist'});
    $routeProvider.when('/release/:slug', {templateUrl: '/partials/release.html', controller: 'release'});
    $routeProvider.otherwise({redirectTo: '/releases/page/1'});
  }]);

  angular.bootstrap(document, ['recrecords']);

});