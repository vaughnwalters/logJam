"use strict";

console.log("LoginCtrl.js loading");

app.controller("LoginCtrl", function ($scope, $routeParams, $location, AuthFactory) {
  // inject factories into the scope as needed


  let user = {};

  $scope.login = () => {
    console.log("login clicked");
    user = {
      email: $scope.email,
      password: $scope.password
    }
    AuthFactory.loginUser(user)
    .then((userObj) => {
      console.log("userObj", userObj.data.userId);
      // let userId = userObj.data.userId;
      $location.path(`/myJams`)
    })

  }

});


//   $scope.saveNewJam = () => {
//     newJam = {
//       userId: userId,
//       title: $scope.title,
//       lyric: $scope.lyric
//     }
//     console.log("newJam", newJam);
//     DatabaseFactory.postNewJam(newJam)
//     .then((newJam) => { 
//       console.log("newJam", newJam);
//       // $location.path('/myJams')
//     })
//   }
// });
