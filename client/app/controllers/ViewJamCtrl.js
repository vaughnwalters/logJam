"use strict";

console.log("ViewJamCtrl.js loading");

app.controller("ViewJamCtrl", function ($scope, $routeParams, $location, DatabaseFactory) {
  // inject factories into the scope as needed

  $scope.songId = $routeParams.id

  DatabaseFactory.getJamFromDb($scope.songId)
    .then(function(jam) {
      console.log("jam.data", jam.data.songs);
      $scope.jam = jam.data.songs;
  });

  

});
