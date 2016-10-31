"use strict";

app.factory("DatabaseFactory", function(LogJamUrl, $q, $http) {

  // let jamId = `580fe610dd9d110010a9506d`

  let getJamFromDb = function(jamId) {
    console.log("LogJamUrl", LogJamUrl);
    console.log("jamId", jamId);

    return $http.get(`${LogJamUrl}/api/getOne/${jamId}`)
  };



  let getUserJamsFromDb = function(userId) {
    console.log("userId", userId );
    return $http.get(`${LogJamUrl}/api/getAll/`)
  }


  let postNewJam = function(song) {
    console.log("song", song);
    return $http.post(`${LogJamUrl}/api/newSong/`, song)
  }

  let deleteJamFromDb = function(jamId) {
    return $http.get(`${LogJamUrl}/api/deleteSong/${jamId}`)
  }

  let editJamInDb = function(jamId, song) {
    console.log(song)
    return $http.put(`${LogJamUrl}/api/updateSong/${jamId}`, JSON.stringify(song))
  }

  // let getUserJamsFromDb = function(userId) {
  //   return $q(function(resolve, reject) {
  //     $http.get(`${LogJamUrl}/api/getOne/${jamId}`)
  //     .then(function(jamObj) {
  //       console.log("jamObj", jamObj);
  //       resolve (jamObj);
  //     })
  //     .catch(function(error) {
  //       reject(error);
  //     });
  //   });
  // }





// don't forget to return any functions created in this factory
  return {getJamFromDb, getUserJamsFromDb, postNewJam, deleteJamFromDb, editJamInDb};
  
});



