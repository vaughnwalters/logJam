"user strict";

app.factory("AuthFactory", function($http) {

  let loginUser = function(loginCreds) {
    return $http.post(`/login`, loginCreds)
  };

  let createUser = function(registerCreds) {
    return $http.post(`/register`, registerCreds)
  };

  let logoutUser = function() {
    return $http.get(`/logout`)
  }

  return {loginUser, createUser, logoutUser};
  
});



