define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'RegisterCtrl'
    }).when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    }).when('/account', {
      templateUrl: 'partials/account.html',
      controller: 'AccountCtrl'
    });
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);

});