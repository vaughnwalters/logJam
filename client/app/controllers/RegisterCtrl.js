"use strict";

console.log("RegisterCtrl.js loading");

app.controller("RegisterCtrl", function ($scope, $routeParams, $location, AuthFactory) {
  // inject factories into the scope as needed

  $scope.register = () => {
    const newUser = {
      displayName: $scope.displayName,
      email: $scope.email,
      password: $scope.password,
      confirmation: $scope.confirmation
    }
  console.log("newUser", newUser);
  AuthFactory.createUser(newUser)
    .then((whut) => { 
      console.log(whut)
    })
  }

});




// 'use strict'

// app.controller('RegisterCtrl', function($scope, $http, $location){
//   $scope.title = "Carbon Dating"
//   $scope.register = () => {
//     const userModel = {
//       userName: $scope.userName,
//       password: $scope.password,
//       info: {
//         customId: Date.now().toString(),
//         name: $scope.name,
//         interests: $scope.interests,
//         about: $scope.about,
//         email: $scope.email,
//         gender: $scope.gender,
//         genPref: $scope.genPref,
//         picture: $scope.picture
//       }
//     }
//     console.log(userModel)
//     $http.post('/api/register', userModel)
//       .then(() => {
//         $location.path('/')
//       })
//   }
// })
