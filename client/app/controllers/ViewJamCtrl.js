"use strict";

console.log("ViewJamCtrl.js loading");

app.controller("ViewJamCtrl", function ($scope, $routeParams, $location, DatabaseFactory) {
  // inject factories into the scope as needed

  $scope.songId = $routeParams.id
  let userId;

  DatabaseFactory.getJamFromDb($scope.songId)
  .then(function(jam) {
    console.log("jam.data", jam.data.songs.userId);
    userId = jam.data.songs.userId;
    console.log("jam.data", jam.data.songs);
    $scope.jam = jam.data.songs;
  });

  $scope.deleteJam = (songId) => {  
    // console.log("songId", songId._id);
    // let userId = jam.data.userId;
    // console.log("userId", userId);
    DatabaseFactory.deleteJamFromDb(songId._id)
    .then(() => {
      console.log("userId", userId);
      $location.path(`/myJams/${userId}`)
    })
  }
});


// /api/deleteSong/:id
