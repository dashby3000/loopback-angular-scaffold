'use strict';

/**
 * @ngdoc overview
 * @name apiWebApp
 * @description
 * # apiWebApp
 *
 * Main module of the application.
 */
var app = angular
    .module('apiWebApp', [
        'lbServices',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider, $locationProvider) {
        Object.keys(window.CONFIG.routes)
            .forEach(function (route) {
                var routeDef = window.CONFIG.routes[route];
                $routeProvider.when(route, routeDef);
            });

        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });

