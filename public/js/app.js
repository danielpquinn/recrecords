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
    $routeProvider.when('/releases/page/:page', {
      templateUrl: '/partials/releases.html',
      controller: 'releases',
      resolve: {
        releases: function ($route, api) { return api.async('releases/' + $route.current.params.page); },
        artists: function (api) { return api.async('artists'); }
      }
    });
    $routeProvider.when('/artist/:slug', {templateUrl: '/partials/artist.html', controller: 'artist'});
    $routeProvider.when('/release/:slug', {
      templateUrl: '/partials/release.html',
      controller: 'release',
      resolve: {
        release: function ($route, api) { return api.async('release/' + $route.current.params.slug); },
        artists: function (api) { return api.async('artists'); },
        otherReleases: function ($route, api) { return api.async('release/' + $route.current.params.slug).then(function (result) {
          return api.async('artist/' + result.artist.slug + '/releases');
        })}
      }
    });
    $routeProvider.when('/artist/:slug/releases/page/:page', {
      templateUrl: '/partials/releases.html',
      controller: 'releases',
      resolve: {
        releases: function ($route, api) { return api.async('artist/' + $route.current.params.slug + '/releases'); },
        artists: function (api) { return api.async('artists'); }
      }
    });
    $routeProvider.otherwise({ redirectTo: '/releases/page/1' });
  }]);

  angular.bootstrap(document, ['recrecords']);

});