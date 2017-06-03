'use strict';

/**
 * @ngdoc function
 * @name filmikApp.controller:MovieCtrl
 * @description
 * # MovieCtrl
 * Controller of the filmikApp
 */
angular.module('filmikApp')
    .controller('MovieCtrl', ['$scope', '$rootScope', '$location', '$filter', 'mediaService', function($scope, $rootScope, $location, $filter, mediaService) {
        $scope.videos = mediaService.movies;

        if ($rootScope.selectedVideo === null) {
            $scope.selectedVideo = "";
        } else {
            $scope.selectedVideo = $rootScope.selectedVideo.id;
        }

        $scope.nextClick = function() {
            $rootScope.selectedVideo = $filter('filter')($scope.videos, { id: $scope.selectedVideo })[0];
            $location.path('effect');
            // BUG dasz, jak wybiorę nic, lub jedno/dwa, mogę kliknąć dalej 
        };
    }]);