'use strict';

angular.module('recrecords.directives', [])
  .directive('player', [function () {
    return {
      restrict: 'A',
      templateUrl: '/partials/player.html',
      link: function (scope, element, attrs) {

        scope.$on('$destroy', function () {
          soundManager.stopAll();
          scope.sound = null;
        });

        scope.$watch('tracks', function (val) {

          if (scope.tracks) {
            scope.selectedTrack = 0;
            scope.playing = false;

            scope.sound = soundManager.createSound({
              id: Date(),
              url: scope.tracks[scope.selectedTrack].url
            });

            scope.pause = function () {
              scope.playing = false;
              scope.sound.pause();
            };

            scope.play = function (index) {
              scope.selectedTrack = index;
              scope.sound.stop();
              scope.sound.url = scope.tracks[scope.selectedTrack].url;
              scope.playing = true;
              scope.sound.play();
            };

            scope.next = function () {
              if (scope.selectedTrack < scope.tracks.length - 1) {
                scope.selectedTrack += 1;
                scope.sound.stop();
                scope.sound.url = scope.tracks[scope.selectedTrack].url;
                scope.playing = true;
                scope.sound.play();
              }
            };

            scope.previous = function () {
              if (scope.selectedTrack > 0) {
                scope.selectedTrack -= 1;
                scope.sound.stop();
                scope.sound.url = scope.tracks[scope.selectedTrack].url;
                scope.playing = true;
                scope.sound.play();
              }
            };
          }

        });
      }
    }
  }]);