'use strict';

angular.module('recrecords.controllers', ['recrecords.services'])
  .controller('releases', function ($scope, releases, artists) {
    releases.pages = [];
    for (var i = 0; i < releases.totalPages; i += 1) { releases.pages.push(i); }
    $scope.releases = releases;
    $scope.artists = artists;
  })
  .controller('release', function ($sce, $scope, data) {
    $scope.data = data;
    $scope.data.description = $sce.trustAsHtml(data.description);
  })
  .controller('artists', function ($scope, artists) {
    $scope.artists = artists;
  });