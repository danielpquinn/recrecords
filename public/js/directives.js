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

        scope.$watch('data.tracks', function (val) {
          if (!scope.data) { return; }

          scope.progress = 0;

          if (scope.data.tracks) {
            scope.selectedTrack = 0;
            scope.playing = false;

            scope.sound = soundManager.createSound({
              id: Date(),
              url: scope.data.tracks[scope.selectedTrack].url,
              onload: function () {
                var that = this;
                scope.$apply(function () {
                  scope.duration = that.duration;
                });
              },
              whileplaying: function () {
                var that = this;
                scope.$apply(function () {
                  scope.progress = parseFloat(that.position / that.duration * 100, 2);
                  scope.position = that.position;
                });
              },
              onfinish: function () {
                scope.next();
              }
            });

            scope.pause = function () {
              scope.playing = false;
              scope.sound.pause();
            };

            scope.play = function (index) {
              scope.selectedTrack = index;
              scope.sound.stop();
              scope.sound.url = scope.data.tracks[scope.selectedTrack].url;
              scope.playing = true;
              scope.sound.play();
            };

            scope.next = function () {
              if (scope.selectedTrack < scope.data.tracks.length - 1) {
                scope.selectedTrack += 1;
                scope.sound.stop();
                scope.sound.url = scope.data.tracks[scope.selectedTrack].url;
                scope.playing = true;
                scope.sound.play();
              }
            };

            scope.previous = function () {
              if (scope.selectedTrack > 0) {
                scope.selectedTrack -= 1;
                scope.sound.stop();
                scope.sound.url = scope.data.tracks[scope.selectedTrack].url;
                scope.playing = true;
                scope.sound.play();
              }
            };
          }

        });
      }
    }
  }])

  .directive('header', [function () {
    return {
      restrict: 'A',
      templateUrl: '/partials/header.html',
      link: function (scope, element, attrs) {
        
      }
    }
  }]);