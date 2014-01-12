'use strict';

angular.module('recrecords.controllers', ['recrecords.services'])
  .controller('releases', ['api', '$scope', '$routeParams', function (api, $scope, $routeParams) {
    api.async('releases/' + $routeParams.page).then(function (data) {
      data.pages = [];
      for (var i = 0; i < data.totalPages; i += 1) { data.pages.push(i); }
      $scope.data = data;
    });
  }])
  .controller('artist', ['api', '$routeParams', '$scope', function (api, $routeParams, $scope) {
    api.async('artist/' + $routeParams.slug ).then(function (data) { $scope.artist = data; });
  }])
  .controller('release', ['api', '$sce', '$routeParams', '$scope', function (api, $sce, $routeParams, $scope) {
    api.async('release/' + $routeParams.slug ).then(function (data) {
      $scope.data = data;
      $scope.data.description = $sce.trustAsHtml(data.description);
    });
  }]);