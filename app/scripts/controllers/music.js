'use strict';

/**
 * @ngdoc function
 * @name filmikApp.controller:MusicCtrl
 * @description
 * # MusicCtrl
 * Controller of the filmikApp
 */
angular.module('filmikApp')
    .controller('MusicCtrl', ['$scope', '$rootScope', '$location', '$filter', 'mediaService',
        function($scope, $rootScope, $location, $filter, mediaService) {
            $scope.musics = mediaService.music;

            if ($rootScope.selectedMusic === null) {
                $scope.selectedMusic = "";
            } else {
                $scope.selectedMusic = $rootScope.selectedMusic.id;
            }
            $scope.nextClick = function() {
                $rootScope.selectedMusic = $filter('filter')($scope.musics, { id: $scope.selectedMusic })[0];
                $location.path('player');
            };
        }
    ]);