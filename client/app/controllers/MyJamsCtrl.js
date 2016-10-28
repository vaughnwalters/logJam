"use strict";

console.log("MyJamsCtrl.js loading");

app.controller("MyJamsCtrl", function ($scope, $routeParams, $location, DatabaseFactory) {
  // inject factories into the scope as needed

  $scope.allUserJams = [];
  $scope.userId = $routeParams.userId

  DatabaseFactory.getUserJamsFromDb($scope.userId)
  .then(function(allUserJams) {
    $scope.allUserJams = allUserJams.data.userSongArr;
    console.log("allUserJams", $scope.allUserJams);
  })

  

});





  // $scope.getAllSongs = function(userId) {
  //   console.log("getAllSongs userId", userId);
  //   DatabaseFactory.getUserJamsFromDb(userId)
  //     .then(function(allUserJams) {
  //       $scope.allUserJams = allUserJams.data.userSongArr;
  //       console.log("allUserJams", $scope.allUserJams);
  //     })
  // }

