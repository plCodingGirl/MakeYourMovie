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
