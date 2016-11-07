"use strict";

app.controller("NewJamCtrl", function ($scope, DatabaseFactory, $routeParams, AuthFactory, $location, $rootScope) {

  $(document).ready(function () {
    $('a[rel*=recordModal]').leanModal({ top : 200, closeButton: ".modal_close" });       
  });

  $scope.userId = $routeParams.userId

  let newJam = {}

  $scope.saveNewJam = () => {
    newJam = {
      title: $scope.title,
      lyric: $scope.lyric
    }
    DatabaseFactory.postNewJam(newJam)
    .then((newJam) => { 
      $location.path(`/myJams`)
    })
  }

  $scope.logout = () => {
    AuthFactory.logoutUser()
    .then(() => $location.path('/'))
  }

});

