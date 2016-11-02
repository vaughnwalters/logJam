"use strict";

app.controller("NewJamCtrl", function ($scope, DatabaseFactory, $routeParams, AuthFactory, $location) {


  $(document).ready(function () {
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal();

    // $("#trigger_id").leanModal({ top : 200, overlay : 0.4, closeButton: ".modal_close" });
  });

  $(function() {
    $('a[rel*=recordModal]').leanModal({ top : 200, closeButton: ".modal_close" });       
  });

  $scope.userId = $routeParams.userId
  // let userId = $routeParams.userId

  let newJam = {}

  // console.log("newJam", newJam);

  $scope.saveNewJam = () => {
    newJam = {
      // userId: userId,
      title: $scope.title,
      lyric: $scope.lyric
    }
    // console.log("newJam", newJam);
    DatabaseFactory.postNewJam(newJam)
    .then((newJam) => { 
      // console.log("newJam", newJam);
      $location.path(`/myJams`)
    })
  }

  $scope.logout = () => {
    AuthFactory.logoutUser()
    .then(() => $location.path('/'))
  }

});

