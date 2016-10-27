"use strict";

console.log("MyJamsCtrl.js loading");

app.controller("MyJamsCtrl", function ($scope, $routeParams, $location, DatabaseFactory) {
  // inject factories into the scope as needed

  $scope.allUserJams = [];

  $scope.getAllSongs = function(userId) {
    console.log("getAllSongs userId", userId);
    DatabaseFactory.getUserJamsFromDb(userId)
      .then(function(allUserJams) {
        $scope.allUserJams = allUserJams.data.userSongArr;
        console.log("allUserJams", $scope.allUserJams);
      })
  }



});


  // $scope.getSong = function(songId) {
  //   console.log("getSong");
  //   DatabaseFactory.getJamFromDb(songId)
  //     .then(function(jam) {
  //       console.log("jam.data", jam.data.songs);
  //       $scope.jam = jam.data.songs;
  //   });
  // }    
