"use strict";

app.controller("MyJamsCtrl", function ($scope, $routeParams, $location, AuthFactory, DatabaseFactory) {

  $scope.allUserJams = [];

  // GET USER JAMS
  DatabaseFactory.getUserJamsFromDb()
  .then(function(allUserJams) {
    $scope.allUserJams = allUserJams.data.userSongArr;
  })

  $scope.logout = () => {
    AuthFactory.logoutUser()
    .then(() => $location.path('/'))
  }
  
});

