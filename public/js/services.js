'use strict';

angular.module('recrecords.services', [])
  .factory('api', function ($http) {
    return {
      async: function (endpoint) {
        return $http({ method: 'GET', url: '/api/' + endpoint, cache: true }).then(function (response) {
          return response.data;
        });
      }
    };
  });