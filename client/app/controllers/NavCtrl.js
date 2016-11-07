"use strict";

app.controller("NavCtrl", function ($scope, $location, AuthFactory) {

  $scope.logout = () => {
    AuthFactory.logoutUser()
    .then(() => $location.path('/'))
  }
  
});

