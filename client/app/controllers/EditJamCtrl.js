"use strict";

console.log("EditJamCtrl.js loading");

app.controller("EditJamCtrl", function ($scope, DatabaseFactory, $routeParams, $location) {

  let songId = $routeParams.id

  let editJam = {}

  console.log("newJam", newJam);
  // $scope.title = "ha ha "
  // $scope.lyric = "lyric go here" 

  $scope.saveNewJam = () => {
    newJam = {
      userId: userId,
      title: $scope.title,
      lyric: $scope.lyric
    }
    console.log("newJam", newJam);
    DatabaseFactory.postNewJam(newJam)
    .then((newJam) => { 
      console.log("newJam", newJam);
      $location.path(`/myJams`)
    })
  }
});

