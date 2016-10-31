"use strict";

console.log("ViewJamCtrl.js loading");

app.controller("ViewJamCtrl", function ($scope, $routeParams, $location, DatabaseFactory) {
  // inject factories into the scope as needed

  $scope.songId = $routeParams.id  
  let userId;


  DatabaseFactory.getJamFromDb($scope.songId)
  .then(function(jam) {
    userId = jam.data.songs.userId;
    console.log("jam.data", jam.data.songs);
    $scope.jam = jam.data.songs;
    $scope.title = jam.data.songs.title;
    $scope.lyric = jam.data.songs.lyric;
  });

  $scope.saveEditJam = (songId) => {
    DatabaseFactory.editJamInDb($routeParams.id, {title: $scope.title, lyric: $scope.lyric})
    .then(() => {
      // console.log("songObj", songObj);
      $location.path(`/myJams/${userId}`)      
    })
  }

  $scope.deleteJam = (songId) => {  
    DatabaseFactory.deleteJamFromDb(songId._id)
    .then(() => {
      console.log("userId", userId);
      $location.path(`/myJams/${userId}`)
    })
  }
});


