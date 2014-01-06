'use strict';

angular.module('recrecords.controllers', ['recrecords.services'])
  .controller('home', ['api', '$scope', function (api, $scope) {
    api.async('artists').then(function (data) { $scope.artists = data; });
    api.async('releases').then(function (data) { $scope.releases = data; });
  }])
  .controller('artist', ['api', '$routeParams', '$scope', function (api, $routeParams, $scope) {
    api.async('artist/' + $routeParams.slug ).then(function (data) { $scope.artist = data; });
  }])
  .controller('release', ['api', '$sce', '$routeParams', '$scope', function (api, $sce, $routeParams, $scope) {
    api.async('release/' + $routeParams.slug ).then(function (data) {
      $scope.artist = data.artist;
      $scope.description = $sce.trustAsHtml(data.description);
      $scope.image = data.image;
      $scope.publishedDate = data.publishedDate;
      $scope.title = data.title;
      $scope.tracks = data.tracks;
    });
  }]);