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
            $scope.effects = mediaService.effects;

            if ($rootScope.selectedEffect === null) {
                $scope.selectedEffect = "";
            } else {
                $scope.selectedEffect = $rootScope.selectedEffect.id;
            }

            $scope.nextClick = function() {
                $rootScope.selectedEffect = $filter('filter')($scope.effects, { id: $scope.selectedEffect })[0];

                $location.path('music');
            };
        }
    ]);