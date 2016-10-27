"use strict";

app.factory("DatabaseFactory", function(LogJamUrl, $q, $http) {

  // let jamId = `580fe610dd9d110010a9506d`

  let getJamFromDb = function(jamId) {
    console.log("LogJamUrl", LogJamUrl);
    console.log("getJamFromDb");
    console.log("jamId", jamId);

    
    // return $q(function(resolve, reject) {
    //   $http.get(`${LogJamUrl}/api/getOne/${jamId}`)
    //   .then(function(jamObj) {
    //     console.log("jamObj", jamObj);
    //     resolve (jamObj);
    //   })
    //   .catch(function(error) {
    //     reject(error);
    //   });
    // });
// same as above
    return $http.get(`${LogJamUrl}/api/getOne/${jamId}`)
  };

// don't forget to return any functions created in this factory
  return {getJamFromDb};
  
});



