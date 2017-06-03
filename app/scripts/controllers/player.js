'use strict';

/**
 * @ngdoc function
 * @name filmikApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the filmikApp
 */
angular.module('filmikApp')
    .controller('PlayerCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
        $scope.selectedVideo = $rootScope.selectedVideo;
        $scope.selectedEffect = $rootScope.selectedEffect;
        $scope.selectedMusic = $rootScope.selectedMusic;

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