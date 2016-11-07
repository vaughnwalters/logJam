"use strict";

app.controller("LoginCtrl", function ($scope, $routeParams, $location, AuthFactory) {

  let user = {};

  $scope.login = () => {
    user = {
      email: $scope.email,
      password: $scope.password
    }
    AuthFactory.loginUser(user)
    .then(() => {
      $location.path(`/myJams`)
    })
  }
  
});
