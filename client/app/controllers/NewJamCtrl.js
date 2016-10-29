"use strict";

console.log("NewJamCtrl.js loading");

app.controller("NewJamCtrl", function ($scope, DatabaseFactory, $routeParams, $location) {

  let userId = $routeParams.userId

  let newJam = {}

  console.log("newJam", newJam);

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
      $location.path(`/myJams/${userId}`)
    })
  }
});


    // $http.post('/api/newSong', newJam)
    // .then(() => {
    //   $location.path('/')
    // })
