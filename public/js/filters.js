define(['angular', 'services'], function (angular, services) {
	'use strict';
	
	angular.module('recrecords.filters', ['recrecords.services'])
		.filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
	}]);
});
