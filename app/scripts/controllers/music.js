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
            $scope.selectedMusic = "";
            $scope.musics = mediaService.music;

            $scope.nextClick = function() {
                $rootScope.selectedMusic = $filter('filter')($scope.musics, { id: $scope.selectedMusic })[0];

                $location.path('player');
            };
        }
    ]);