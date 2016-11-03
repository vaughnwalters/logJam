"use strict";

app.controller("LoginCtrl", function ($scope, $routeParams, $location, AuthFactory) {
  // inject factories into the scope as needed

  // // FOR NAVBAR
  // $(document).ready(function(){
  //   $(".button-collapse").sideNav(
  //     {
  //       closeOnClick: true
  //   })
  // });

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
