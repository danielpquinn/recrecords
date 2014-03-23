'use strict';

angular.module('recrecords.controllers', ['recrecords.services'])
  .controller('releases', function ($scope, releases, artists) {
    $scope.mobile = MOBILE;
    releases.pages = [];
    for (var i = 0; i < releases.totalPages; i += 1) { releases.pages.push(i); }
    $scope.releases = releases;
    $scope.artists = artists;
    $scope.route = '/releases';
    $scope.mobile = MOBILE;
    window.scrollTo(0, 0);
  })
  .controller('artistReleases', function ($scope, $routeParams, releases, artists) {
    $scope.mobile = MOBILE;
    releases.pages = [];
    for (var i = 0; i < releases.totalPages; i += 1) { releases.pages.push(i); }
    console.log($routeParams.slug);
    $scope.releases = releases;
    $scope.artists = artists;
    $scope.route = '/artist/' + $routeParams.slug + '/releases';
    window.scrollTo(0, 0);
  })
  .controller('release', function ($sce, $scope, release, artists, otherReleases) {
    $scope.mobile = MOBILE;
    $scope.release = release;
    $scope.release.description = $sce.trustAsHtml(release.description);
    $scope.artists = artists;
    $scope.otherReleases = _.reject(otherReleases.releases, function (release) {
      return release._id === $scope.release._id;
    });
    window.scrollTo(0, 0);
  });