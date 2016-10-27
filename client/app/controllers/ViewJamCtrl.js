"use strict";

console.log("ViewJamCtrl.js loading");

app.controller("ViewJamCtrl", function ($scope, $routeParams, $location, DatabaseFactory) {
  // inject factories into the scope as needed

  $scope.getSong = function(songId) {
    console.log("getSong");
    DatabaseFactory.getJamFromDb(songId)
      .then(function(jam) {
        console.log("jam.data", jam.data.songs);
        $scope.jam = jam.data.songs;
    });
  }    
});
