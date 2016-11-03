"use strict";

app.controller("ViewJamCtrl", function ($scope, $routeParams, $location, AuthFactory, DatabaseFactory, $rootScope) {
  // inject factories into the scope as needed

  $(document).ready(function () {
    $('a[rel*=recordModal]').leanModal({ top : 200, closeButton: ".modal_close" });       
  });

  $scope.songId = $routeParams.id  
  let userId;


  DatabaseFactory.getJamFromDb($scope.songId)
  .then(function(jam) {
    $scope.jam = jam.data.songs;
    $scope.title = jam.data.songs.title;
    $scope.lyric = jam.data.songs.lyric;
  });

  $scope.saveEditJam = (songId) => {
    DatabaseFactory.editJamInDb($routeParams.id, {title: $scope.title, lyric: $scope.lyric})
    .then(() => {
      $location.path(`/myJams`)      
    })
  }

  $scope.deleteJam = (songId) => {  
    DatabaseFactory.deleteJamFromDb(songId._id)
    .then(() => {
      $location.path(`/myJams`)
    })
  }

  $scope.logout = () => {
    AuthFactory.logoutUser()
      .then(() => $location.path('/'))
  }

});



