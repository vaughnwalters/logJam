"use strict";

app.controller("MyJamsCtrl", function ($scope, $routeParams, $location, AuthFactory, DatabaseFactory) {
  // inject factories into the scope as needed

  // FOR NAVBAR
  $(document).ready(function(){
    $(".button-collapse").sideNav(
      {
        closeOnClick: true
    })
  });


  $scope.allUserJams = [];
  // $scope.userId = $routeParams.userId

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





  // $scope.getAllSongs = function(userId) {
  //   console.log("getAllSongs userId", userId);
  //   DatabaseFactory.getUserJamsFromDb(userId)
  //     .then(function(allUserJams) {
  //       $scope.allUserJams = allUserJams.data.userSongArr;
  //       console.log("allUserJams", $scope.allUserJams);
  //     })
  // }

