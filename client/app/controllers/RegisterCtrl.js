"use strict";


app.controller("RegisterCtrl", function ($scope, $routeParams, $location, AuthFactory) {

  $scope.register = () => {
    const newUser = {
      displayName: $scope.displayName,
      email: $scope.email,
      password: $scope.password,
      confirmation: $scope.confirmation
    }
    AuthFactory.createUser(newUser)
    .then((whut) => { 
      $location.path(`/login`)
    })
  }

});
