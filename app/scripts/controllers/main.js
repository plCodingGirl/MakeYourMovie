'use strict';

/**
 * @ngdoc function
 * @name filmikApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the filmikApp
 */
angular.module('filmikApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'mediaService', function($scope, $rootScope, $location, mediaService) {

        $rootScope.selectedVideo = null;
        $rootScope.selectedMusic = null;
        $rootScope.selectedEffect = null;

        $scope.nextClick = function() {
            $location.path('movie');
        };

        $scope.randomClick = function() {
            $rootScope.selectedVideo = mediaService.movies[Math.floor(Math.random() * mediaService.movies.length)];
            $rootScope.selectedMusic = mediaService.music[Math.floor(Math.random() * mediaService.music.length)];
            $rootScope.selectedEffect = mediaService.effects[Math.floor(Math.random() * mediaService.effects.length)];

            $location.path('player');
        };
    }]);