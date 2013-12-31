define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute'
	], function (angular, filters, services, directives, controllers) {
		'use strict';

		return angular.module('recrecords', [
			'ngRoute',
			'recrecords.controllers',
			'recrecords.filters',
			'recrecords.services',
			'recrecords.directives'
		]);
});
