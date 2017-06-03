'use strict';

/**
 * @ngdoc overview
 * @name filmikApp
 * @description
 * # filmikApp
 *
 * Main module of the application.
 */
angular
  .module('filmikApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/player', {
        templateUrl: 'views/player.html',
        controller: 'PlayerCtrl',
        controllerAs: 'player'
      })
      .when('/movie', {
        templateUrl: 'views/movie.html',
        controller: 'MovieCtrl',
        controllerAs: 'movie'
      })
      .when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl',
        controllerAs: 'music'
      })
      .when('/effect', {
        templateUrl: 'views/effect.html',
        controller: 'EffectCtrl',
        controllerAs: 'effect'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name filmikApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the filmikApp
 */
angular.module('filmikApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'mediaService', function($scope, $rootScope, $location, mediaService) {

        $scope.nextClick = function() {

            $rootScope.selectedMusic = $scope.selectedMusic;

            $location.path('movie');
            // BUG dasz, jak wybiorę nic, lub jedno/dwa, mogę kliknąć dalej 
        };

        $scope.randomClick = function() {
            $rootScope.selectedVideo = mediaService.movies[Math.floor(Math.random() * mediaService.movies.length)];
            $rootScope.selectedMusic = mediaService.music[Math.floor(Math.random() * mediaService.music.length)];
            $rootScope.selectedEffect = mediaService.effects[Math.floor(Math.random() * mediaService.effects.length)];

            $location.path('player');
        };
    }]);
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
'use strict';

/**
 * @ngdoc service
 * @name filmikApp.mediaService
 * @description
 * # mediaService
 * Service in the filmikApp.
 */
angular.module('filmikApp')
    .service('mediaService', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.movies = [
            { id: 1, author: "BRoll.io (CC0)", fileName: "342466734 - BRoll.io - CC0.mp4", thumbnailName: "kawa.jpg" },
            { id: 2, author: "lifeofvids (CC0)", fileName: "342933669 - lifeofvids - CC0.mp4", thumbnailName: "kaluza.jpg" },
            { id: 3, author: "Life-Of-Vids (CC0)", fileName: "343378693 - Life-Of-Vids - CC0.mp4", thumbnailName: "komputer.jpg" },
            { id: 4, author: "Oak & Rumble (CC0)", fileName: "343488880 - Oak & Rumble - CC0.mp4", thumbnailName: "las.jpg" },
            { id: 5, author: "Distill (CC0)", fileName: "343637036 - Distill - CC0.mp4", thumbnailName: "bar.jpg" },
            { id: 6, author: "Coverr (CC0)", fileName: "385124896 - Coverr - CC0.mp4", thumbnailName: "zarowka.jpg" },
            { id: 7, author: "FreeWorld (CC0)", fileName: "Autumn - 1989 - FreeWorld - CC0.mp4", thumbnailName: "kwiaty.jpg" },
            { id: 8, author: "Myriams-Fotos (CC0)", fileName: "Blueberries - 3924 - Myriams-Fotos - CC0.mp4", thumbnailName: "jagody.jpg" },
            { id: 9, author: "keith_12345 (CC0)", fileName: "People - 4714 - keith_12345 - CC0.mp4", thumbnailName: "plaza.jpg" },
            { id: 10, author: "KlausHausmann (CC0)", fileName: "Raspberries - 3777 - KlausHausmann - CC0.mp4", thumbnailName: "malina.jpg" },
            { id: 11, author: "BenjaminNelan (CC0)", fileName: "Snail - 639 - BenjaminNelan - CC0.mp4", thumbnailName: "slimak.jpg" },
            { id: 12, author: "Life-Of-Vids (CC0)", fileName: "Water - 990 - Life-Of-Vids - CC0.mp4", thumbnailName: "woda.jpg" },
        ];

        this.music = [
            { id: 1, name: "Country", fileName: "Daisy_Dukes.mp3", author: "Silent Partner" },
            { id: 2, name: "Funky", fileName: "Feel_The_Funk.mp3", author: "Jimmy Fontanez / Media Right Productions" },
            { id: 3, name: "Hip-hop", fileName: "Butchers.mp3", author: "Silent Partner" },
            { id: 4, name: "Szczęśliwa", fileName: "Morning_Stroll.mp3", author: "Josh Kirsch / Media Right Productions" },
            { id: 5, name: "Dramatyczna", fileName: "Black_Highway.mp3", author: "JR Tundra" },
            { id: 6, name: "Inspirująca", fileName: "Believer.mp3", author: "Silent Partner" },
            { id: 7, name: "Mroczna", fileName: "Prelude_No_15.mp3", author: "Chris Zabriskie" },
            { id: 8, name: "Romantyczna", fileName: "The_Bluest_Star.mp3", author: "The 126ers" },
            { id: 9, name: "Metal", fileName: "March_On.mp3", author: "Ethan Meixsell" },
            { id: 10, name: "Spokojna", fileName: "Where_I_am_From.mp3", author: "Topher Mohr and Alex Elena" },
            { id: 11, name: "Skoczna", fileName: "If_I_Had_a_Chicken.mp3", author: "Kevin MacLeod" },
            { id: 12, name: "R&B", fileName: "All_Aboard.mp3", author: "Silent Partner" },
            { id: 13, name: "Smutna", fileName: "Days_Are_Long.mp3", author: "Silent Partner" },
            { id: 14, name: "Jazz", fileName: "Jazz_In_Paris.mp3", author: "Media Right Productions" },
            { id: 15, name: "Relaksacyjna", fileName: "North.mp3", author: "Silent Partner" },
            { id: 16, name: "Ambient", fileName: "New_Land.mp3", author: "ALBIS" },
            { id: 17, name: "Taneczna", fileName: "Universal.mp3", author: "Vibe Tracks" },
            { id: 18, name: "Reggae", fileName: "Dub_Spirit.mp3", author: "Jingle Punks" },
            { id: 19, name: "Klasyczna", fileName: "Eternal_Hope.mp3", author: "Kevin MacLeod" },
            { id: 20, name: "Bitewna", fileName: "Intended_Force.mp3", author: "Kevin MacLeod" },
        ];

        this.effects = [{
                id: 1,
                name: "Brak",
                thumbnailName: "yeoman.png",
                apply: function(p, video) {
                    p.image(video, 0, 0);
                }
            },
            {
                id: 2,
                name: "Czarno-białe",
                thumbnailName: "yeoman1.png",
                apply: function(p, video) {
                    p.image(video, 0, 0);
                    p.filter('GRAY');
                }
            },
            {
                id: 3,
                name: "Sepia",
                thumbnailName: "yeoman2.png",
                apply: function(p, video) {
                    p.image(video, 0, 0);
                    var c = p.color('rgba(112, 66, 20, 0.4)');
                    p.fill(c);
                    p.stroke(0);
                    p.rect(0, 0, video.width, video.height);
                }
            },
            {
                id: 4,
                name: "Kinowy",
                thumbnailName: "yeoman2.png",
                apply: function(p, video) {
                    p.image(video, 0, 0);
                    var c = p.color('rgba(9, 56, 66, 0.4)');
                    p.fill(c);
                    p.stroke(0); // TODO stroke nie znika
                    p.rect(0, 0, video.width, video.height);
                    p.fill(0);
                    p.rect(0, 0, video.width, 47);
                    p.rect(0, 347, video.width, 47);
                }
            },
            {
                id: 5,
                name: "Niebieski",
                thumbnailName: "yeoman2.png",
                apply: function(p, video) {
                    p.image(video, 0, 0);
                    var c = p.color('rgba(0, 0, 255, 0.2)');
                    p.fill(c);
                    p.stroke(0); // TODO stroke nie znika
                    p.rect(0, 0, video.width, video.height);
                }
            },
            {
                id: 6,
                name: "Czerwony",
                thumbnailName: "yeoman2.png",
                apply: function(p, video) {
                    p.image(video, 0, 0);
                    var c = p.color('rgba(255, 0, 0, 0.15)');
                    p.fill(c);
                    p.stroke(0); // TODO stroke nie znika
                    p.rect(0, 0, video.width, video.height);
                }
            },
            {
                id: 7,
                name: "Zielony",
                thumbnailName: "yeoman2.png",
                apply: function(p, video) {
                    p.image(video, 0, 0);
                    var c = p.color('rgba(0, 255, 0, 0.15)');
                    p.fill(c);
                    p.stroke(0); // TODO stroke nie znika
                    p.rect(0, 0, video.width, video.height);
                }
            },
        ];
    });
angular.module('filmikApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/effect.html',
    "<h4>Efekt</h4> <div class=\"row\"> <div class=\"col-sm-3\" data-ng-repeat=\"effect in effects | orderBy: 'name'\"> <label> <input name=\"effectRadio\" type=\"radio\" value=\"{{effect.id}}\" ng-model=\"$parent.selectedEffect\"> {{effect.name}} </label> </div> </div> <p> <button class=\"btn btn-lg btn-success\" ng-click=\"nextClick()\"> <span class=\"glyphicon glyphicon-arrow-right\"></span> </button> </p>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>mym!</h1> <p class=\"lead\"> Make your movie! </p> </div> <div class=\"row marketing\"> <p> <button class=\"btn btn-lg btn-success\" ng-click=\"nextClick()\"> <span class=\"glyphicon glyphicon-arrow-right\"></span> </button> </p> <p> <button class=\"btn btn-lg btn-info\" ng-click=\"randomClick()\"> <span class=\"glyphicon glyphicon-random\"></span> </button> </p> </div>"
  );


  $templateCache.put('views/movie.html',
    "<h4>Wideo</h4> <label data-ng-repeat=\"video in videos\"> <input name=\"movieRadio\" type=\"radio\" value=\"{{video.id}}\" ng-model=\"$parent.selectedVideo\"> <img src=\"images/movies/{{video.thumbnailName}}\"> {{video.name}} </label> <p> <button class=\"btn btn-lg btn-success\" ng-click=\"nextClick()\"> <span class=\"glyphicon glyphicon-arrow-right\"></span> </button> </p>"
  );


  $templateCache.put('views/music.html',
    "<h4>Muzyka</h4> <div class=\"row\"> <div class=\"col-sm-3\" data-ng-repeat=\"music in musics | orderBy: 'name'\"> <label> <input name=\"musicRadio\" type=\"radio\" value=\"{{music.id}}\" ng-model=\"$parent.selectedMusic\"> <span class=\"glyphicon glyphicon-play\"></span> {{music.name}} </label> </div> </div> <p> <button class=\"btn btn-lg btn-success\" ng-click=\"nextClick()\"> <span class=\"glyphicon glyphicon-arrow-right\"></span> </button> </p>"
  );


  $templateCache.put('views/player.html',
    "<!--<video controls>\n" +
    "  <source src=\"videos/{{selectedVideo.fileName}}\" type=\"video/mp4\">\n" +
    "  Your browser does not support the video tag.\n" +
    "</video>--> <p5video id=\"player\" video=\"selectedVideo\" effect=\"selectedEffect\" music=\"selectedMusic\"> </p5video> <blockquote class=\"blockquote-reverse\"> Wideo: {{selectedVideo}} </blockquote> <blockquote class=\"blockquote-reverse\"> Efekt: {{selectedEffect}} </blockquote> <blockquote class=\"blockquote-reverse\"> Muzyka: {{selectedMusic}} </blockquote>"
  );

}]);
