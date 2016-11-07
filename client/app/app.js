'use strict';

const app = angular.module('logjam', ['ngRoute', 'angularAudioRecorder', 'ui.materialize']) 

app.config(($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: "partials/splash.html",
    controller: "SplashCtrl"
  })
  .when('/login', {
    templateUrl: "partials/login.html",
    controller: "LoginCtrl"
  })
  .when('/register', {
    templateUrl: "partials/register.html",
    controller: "RegisterCtrl"
  })
  .when('/myJams', {
    templateUrl: "partials/myJams.html",
    controller: "MyJamsCtrl"
  })
  .when('/newJam', {
    templateUrl: "partials/newJam.html",
    controller: "NewJamCtrl"
  })
  .when('/audio', {
    templateUrl: "partials/audio.html",
    controller: "AudioCtrl"
  })
  .when('/viewJam/:id', {
    templateUrl: "partials/viewJam.html",
    controller: "ViewJamCtrl"
  })
  .when('/editJam/:id', {
    templateUrl: "partials/editJam.html",
    controller: "EditJamCtrl"
  })
  .otherwise('/');
})

