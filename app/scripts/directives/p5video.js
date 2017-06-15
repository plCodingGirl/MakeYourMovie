'use strict';

angular.module('filmikApp')
    .directive('p5video', ['$window', function($window) {
        return {
            restrict: 'E',
            scope: {
                video: '=',
                effect: '=',
                music: '='
            },
            link: function(scope, element) {
                var p5 = $window.p5;
                var instance = null;

                var start = function() {
                    destroy();
                    instance = new p5(run, element[0]);
                };

                var run = function(p) {
                    var video;
                    var song;

                    p.preload = function() {
                        song = p.loadSound('sounds/' + scope.music.fileName);
                    };

                    p.setup = function() {
                        video = p.createVideo(['videos/' + scope.video.fileName]);
                        p.createCanvas(700, 394);
                        video.size(700, 394);
                        video.hide();
                        video.loop();
                        song.loop();
                    };

                    p.draw = function() {
                        scope.effect.apply(p, video);
                    };
                };

                var destroy = function() {
                    if (instance) {
                        instance.remove();
                        instance = null;
                    }
                };

                start();
                scope.$on('$destroy', function() {
                    destroy();
                });
            },
            //template: "<div id=\"player\"></div>" // TODO dodać ładne guziczki do templatki
        };
    }]);