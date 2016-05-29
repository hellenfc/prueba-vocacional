var app = angular.module('App', ['ngMaterial', 'ui.router']);
app.config(function($httpProvider) {
	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});;
