require.config({
	paths: {
		jquery: '/components/jquery/jquery',
		bootstrap: '/components/bootstrap/dist/js/bootstrap',
		angular: '/components/angular/angular',
		angularRoute: '/components/angular-route/angular-route'
	},
	baseUrl: 'js',
	shim: {
		'bootstrap': {
			deps: [
				'jquery'
			]
		},
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular']
	},
	priority: [
		'angular'
	]
});

// hey Angular, we're bootstrapping manually!
window.name = 'NG_DEFER_BOOTSTRAP!';

require( [
	'angular',
	'app',
	'routes',
	'bootstrap'
], function(angular, app, routes) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		$html.addClass('ng-app');
		angular.bootstrap($html, [app['name']]);
	});
});
