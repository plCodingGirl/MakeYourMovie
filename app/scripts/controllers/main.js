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

        $scope.nextClick = function() {

            $rootScope.selectedMusic = $scope.selectedMusic;

            $location.path('movie');
            // BUG dasz, jak wybiorę nic, lub jedno/dwa, mogę kliknąć dalej 
        };

        $scope.randomClick = function() {
            $rootScope.selectedVideo = mediaService.movies[Math.floor(Math.random() * mediaService.movies.length)];
            $rootScope.selectedMusic = mediaService.music[Math.floor(Math.random() * mediaService.music.length)];
            $rootScope.selectedEffect = mediaService.effects[Math.floor(Math.random() * mediaService.effects.length)];

            $location.path('player');
        };
    }]);