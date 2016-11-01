"user strict";

app.factory("AuthFactory", function(LogJamUrl, $http) {

  let loginUser = function(loginCreds) {
    // console.log("login in AuthFactory clicked");
    return $http.post(`${LogJamUrl}/login`, loginCreds)
  };

  let createUser = function(registerCreds) {
    return $http.post(`${LogJamUrl}/register`, registerCreds)
  };

  let logoutUser = function() {
    return $http.get(`${LogJamUrl}/logout`)
  }

// don't forget to return any functions created in this factory
  return {loginUser, createUser, logoutUser};
  
});



