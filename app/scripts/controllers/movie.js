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
        $scope.selectedVideo = "";
        $scope.videos = mediaService.movies;

        console.log(mediaService);
        $scope.nextClick = function() {
            $rootScope.selectedVideo = $filter('filter')($scope.videos, { id: $scope.selectedVideo })[0];

            $location.path('effect');
            // BUG dasz, jak wybiorę nic, lub jedno/dwa, mogę kliknąć dalej 
        };
    }]);