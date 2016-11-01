"user strict";

app.factory("AuthFactory", function($http) {

  let loginUser = function(loginCreds) {
    // console.log("login in AuthFactory clicked");
    return $http.post(`/login`, loginCreds)
  };

  let createUser = function(registerCreds) {
    return $http.post(`/register`, registerCreds)
  };

  let logoutUser = function() {
    return $http.get(`/logout`)
  }

// don't forget to return any functions created in this factory
  return {loginUser, createUser, logoutUser};
  
});



