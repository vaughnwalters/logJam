"user strict";


app.factory("AuthFactory", function(LogJamUrl, $http) {

  let loginUser = function(loginCreds) {
    return $http.post(`${LogJamUrl}/login`, loginCreds)
  };

// don't forget to return any functions created in this factory
  return {loginUser};
  
});



