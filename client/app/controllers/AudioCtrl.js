'use strict';

app.controller('AudioCtrl', function ($scope, $timeout) {
  $scope.timeLimit = 10;
}).config(function (recorderServiceProvider) {
  recorderServiceProvider
    .forceSwf(false)
    .withMp3Conversion(true);
});

