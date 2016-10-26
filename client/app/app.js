'use strict';

const app = angular.module('logjam', ['ngRoute']) 

  app.config($routeProvider => {
    $routeProvider
    .when('/', {
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
      controller: "LoginCtrl"
    })
    .otherwise('/');
  })
