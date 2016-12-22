'use strict';

var app = angular.module("mgApp", [
    'ngRoute',
    'angular-clipboard',
    'ui.bootstrap',
    'ngCookies'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'modules/home/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

