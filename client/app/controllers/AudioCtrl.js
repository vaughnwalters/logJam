// (function () {
  'use strict';

  // angular.module('recorderDemo', [
  //     'angularAudioRecorder'
  //   ])
    app.controller('AudioCtrl', function ($scope, $timeout) {
      console.log("Loaded");
      $scope.timeLimit = 10;


    }).config(function (recorderServiceProvider) {
    recorderServiceProvider
      .forceSwf(false)
      // .setSwfUrl('/lib/recorder.swf')
      .withMp3Conversion(true)
    ;
  });

// })();
