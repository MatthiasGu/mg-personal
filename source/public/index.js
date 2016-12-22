'use strict';

var app = angular.module("mgApp", [
    'ngRoute',
    'angular-clipboard',
    'ui.bootstrap',
    'ngCookies'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/landing', {
            templateUrl: 'modules/landing/guestLanding/guestLanding.html',
            controller: 'LandingController'
        })
        .when('/', {
            templateUrl: 'modules/home/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

