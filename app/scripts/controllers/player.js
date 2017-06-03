'use strict';

/**
 * @ngdoc function
 * @name filmikApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the filmikApp
 */
angular.module('filmikApp')
    .controller('PlayerCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.selectedVideo = $rootScope.selectedVideo;
        $scope.selectedEffect = $rootScope.selectedEffect;
        $scope.selectedMusic = $rootScope.selectedMusic;
    }]);