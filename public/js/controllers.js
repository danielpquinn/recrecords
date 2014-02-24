'use strict';

angular.module('recrecords.controllers', ['recrecords.services'])
  .controller('releases', function ($scope, releases, artists) {
    releases.pages = [];
    for (var i = 0; i < releases.totalPages; i += 1) { releases.pages.push(i); }
    $scope.releases = releases;
    $scope.artists = artists;
  })
  .controller('release', function ($sce, $scope, release, artists, otherReleases) {
    $scope.release = release;
    $scope.release.description = $sce.trustAsHtml(release.description);
    $scope.artists = artists;
    $scope.otherReleases = _.reject(otherReleases.releases, function (release) {
      return release._id === $scope.release._id;
    });
  });