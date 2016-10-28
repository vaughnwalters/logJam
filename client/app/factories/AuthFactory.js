"user strict";


app.factory("AuthFactory", function(LogJamUrl, $http) {


  let loginUser = function(loginCreds) {
    console.log("LogJamUrl", LogJamUrl);
    console.log("loginCreds", loginCreds);

    return $http.post(`${LogJamUrl}/login`, loginCreds)
  };


// don't forget to return any functions created in this factory
  return {loginUser};
  
});



