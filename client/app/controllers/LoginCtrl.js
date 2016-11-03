"use strict";

app.controller("LoginCtrl", function ($scope, $routeParams, $location, AuthFactory) {

  let user = {};

  $scope.login = () => {
    // console.log("login clicked");
    user = {
      email: $scope.email,
      password: $scope.password
    }
    AuthFactory.loginUser(user)
    .then(() => {
    // .then((userObj) => {
      // console.log("userObj", userObj.data.userId);
      // let userId = userObj.data.userId;
      $location.path(`/myJams`)
    })

  }

});
