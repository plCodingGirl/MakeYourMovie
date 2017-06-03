'use strict';

/**
 * @ngdoc function
 * @name filmikApp.controller:EffectCtrl
 * @description
 * # EffectCtrl
 * Controller of the filmikApp
 */
angular.module('filmikApp')
    .controller('EffectCtrl', ['$scope', '$rootScope', '$location', '$filter', 'mediaService',
        function($scope, $rootScope, $location, $filter, mediaService) {
            $scope.selectedEffect = "";
            $scope.effects = mediaService.effects;

            $scope.nextClick = function() {
                $rootScope.selectedEffect = $filter('filter')($scope.effects, { id: $scope.selectedEffect })[0];

                $location.path('music');
            };
        }
    ]);