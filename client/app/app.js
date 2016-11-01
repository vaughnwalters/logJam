'use strict';

const app = angular.module('logjam', ['ngRoute']) 
  .constant('LogJamUrl', "http://localhost:3000")
  // .constant('LogJamUrl', "https://vw-logjam.herokuapp.com")

  app.config(($routeProvider) => {
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
      controller: "NewJamCtrl"
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
