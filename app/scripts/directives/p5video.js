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
                    var playing = true;
                    var video;
                    var song;
                    var button;

                    p.preload = function() {
                        song = p.loadSound('sounds/' + scope.music.fileName);
                        video = p.createVideo(['videos/' + scope.video.fileName]);
                    };

                    p.setup = function() {
                        p.createCanvas(700, 394);
                        console.log(scope);
                        button = p.createButton('pause');
                        video.size(700, 394);
                        video.loop();
                        song.loop();
                        button.mousePressed(toggleVid); // attach button listener
                        video.hide();
                        console.log(video);
                    };

                    var toggleVid = function() {
                        if (playing) {
                            video.pause();
                            song.pause();
                            button.html('play');
                        } else {
                            video.loop();
                            song.loop();
                            button.html('pause');
                        }
                        playing = !playing;
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