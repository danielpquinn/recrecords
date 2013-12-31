define(['angular', 'services'], function (angular) {
	'use strict';

	return angular.module('recrecords.controllers', ['recrecords.services'])
		.controller('HomeCtrl', ['$scope', function ($scope) {
			$scope.title = 'home';
		}])
    .controller('RegisterCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
      $scope.submitted = false;

      $scope.register = function () {
        $scope.userForm.usernameInput.$setValidity('unique', true);
        $scope.userForm.emailInput.$setValidity('unique', true);
        $http.post('/register', $scope.user).success(function (data) {
        }).success(function (data) {
          $scope.submitted = true;
          $location.path('/account');
        }).error(function (data) {
          $scope.submitted = true;
          if (data.msg === 'User already exists') {
            $scope.userForm.usernameInput.$setValidity('unique', false);
          }
          if (data.msg === 'Email already exists') {
            $scope.userForm.emailInput.$setValidity('unique', false);
          }
        });
      };
    }])
    .controller('LoginCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
      $scope.submitted = false;

      $scope.login = function () {
        $scope.userForm.usernameInput.$setValidity('known', true);
        $scope.userForm.usernameInput.$setValidity('valid', true);
        $http.post('/login', $scope.user).success(function (data) {
          console.log(data);
          $location.path('/account');
        }).error(function (data) {
          console.log(data);
          $scope.submitted = true;
          if (data.msg === 'Unknown user') {
            console.log('Unknown user');
            $scope.userForm.usernameInput.$setValidity('known', false);
          }
          if (data.msg === 'Invalid password') {
            console.log('Invalid password');
            $scope.userForm.passwordInput.$setValidity('valid', false);
          }
        });
      }
    }])
    .controller('AccountCtrl', ['$scope', '$http', 'user', function ($scope, $http, user) {
      console.log(user);
    }]);
});