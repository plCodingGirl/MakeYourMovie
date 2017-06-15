'use strict';

/**
 * @ngdoc function
 * @name filmikApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the filmikApp
 */
angular.module('filmikApp')
    .controller('PlayerCtrl', ['$scope', '$rootScope', '$location', 'Backand', function($scope, $rootScope, $location, Backand) {
        $scope.selectedVideo = $rootScope.selectedVideo;
        $scope.selectedEffect = $rootScope.selectedEffect;
        $scope.selectedMusic = $rootScope.selectedMusic;

        Backand.object.create('stats', {
            "movie": $scope.selectedVideo.id,
            "effect": $scope.selectedEffect.id,
            "music": $scope.selectedMusic.id
        });

        $scope.goBackToMovie = function() {
            $location.path('movie');
        };
        $scope.goBackToEffect = function() {
            $location.path('effect');
        };
        $scope.goBackToMusic = function() {
            $location.path('music');
        };
    }]);