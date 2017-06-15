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
            { id: 1, author: "BRoll.io (CC0)", fileName: "342466734 - BRoll.io - CC0.mp4", thumbnailName: "kawa.jpg", name: "Kawa" },
            { id: 2, author: "lifeofvids (CC0)", fileName: "342933669 - lifeofvids - CC0.mp4", thumbnailName: "kaluza.jpg", name: "Kałuża" },
            { id: 3, author: "Life-Of-Vids (CC0)", fileName: "343378693 - Life-Of-Vids - CC0.mp4", thumbnailName: "komputer.jpg", name: "Komputer" },
            { id: 4, author: "Oak & Rumble (CC0)", fileName: "343488880 - Oak & Rumble - CC0.mp4", thumbnailName: "las.jpg", name: "Las" },
            { id: 5, author: "Distill (CC0)", fileName: "343637036 - Distill - CC0.mp4", thumbnailName: "bar.jpg", name: "Bar" },
            { id: 6, author: "Coverr (CC0)", fileName: "385124896 - Coverr - CC0.mp4", thumbnailName: "zarowka.jpg", name: "Żarówka" },
            { id: 7, author: "FreeWorld (CC0)", fileName: "Autumn - 1989 - FreeWorld - CC0.mp4", thumbnailName: "kwiaty.jpg", name: "Kwiaty" },
            { id: 8, author: "Myriams-Fotos (CC0)", fileName: "Blueberries - 3924 - Myriams-Fotos - CC0.mp4", thumbnailName: "jagody.jpg", name: "Jagody" },
            { id: 9, author: "keith_12345 (CC0)", fileName: "People - 4714 - keith_12345 - CC0.mp4", thumbnailName: "plaza.jpg", name: "Plaża" },
            { id: 10, author: "KlausHausmann (CC0)", fileName: "Raspberries - 3777 - KlausHausmann - CC0.mp4", thumbnailName: "malina.jpg", name: "Malina" },
            { id: 11, author: "BenjaminNelan (CC0)", fileName: "Snail - 639 - BenjaminNelan - CC0.mp4", thumbnailName: "slimak.jpg", name: "Ślimak" },
            { id: 12, author: "Life-Of-Vids (CC0)", fileName: "Water - 990 - Life-Of-Vids - CC0.mp4", thumbnailName: "woda.jpg", name: "Woda" },
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