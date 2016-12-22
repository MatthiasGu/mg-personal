'use strict';

var app = angular.module("mgApp", [
    'ngRoute',
    'angular-clipboard',
    'ui.bootstrap',
    'ngCookies'
]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'modules/home/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});

