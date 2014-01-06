'use strict';

angular.module('recrecords.services', [])
  .factory('api', function ($http) {
    return {
      async: function (endpoint) {
        return $http.get('/api/' + endpoint).then(function (response) {
          return response.data;
        });
      }
    };
  });