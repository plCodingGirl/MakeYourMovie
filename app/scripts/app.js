'use strict';

/**
 * @ngdoc overview
 * @name filmikApp
 * @description
 * # filmikApp
 *
 * Main module of the application.
 */
angular
    .module('filmikApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'backand'
    ])
    .config(function($routeProvider, BackandProvider) {
        BackandProvider.setAppName('makeyourmovie');
        BackandProvider.setAnonymousToken('fb4233db-62d8-4f02-a1ed-baaa240e0997');
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/player', {
                templateUrl: 'views/player.html',
                controller: 'PlayerCtrl',
                controllerAs: 'player'
            })
            .when('/movie', {
                templateUrl: 'views/movie.html',
                controller: 'MovieCtrl',
                controllerAs: 'movie'
            })
            .when('/music', {
                templateUrl: 'views/music.html',
                controller: 'MusicCtrl',
                controllerAs: 'music'
            })
            .when('/effect', {
                templateUrl: 'views/effect.html',
                controller: 'EffectCtrl',
                controllerAs: 'effect'
            })
            .otherwise({
                redirectTo: '/'
            });
    });