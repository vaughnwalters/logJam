"use strict";

app.factory("DatabaseFactory", function($q, $http) {

  let getJamFromDb = function(jamId) {
    return $http.get(`/api/getOne/${jamId}`)
  }

  let getUserJamsFromDb = function() {
    return $http.get(`/api/getAll/`)
  }

  let postNewJam = function(song) {
    return $http.post(`/api/newSong/`, song)
  }

  let deleteJamFromDb = function(jamId) {
    return $http.get(`/api/deleteSong/${jamId}`)
  }

  let editJamInDb = function(jamId, song) {
    return $http.put(`/api/updateSong/${jamId}`, JSON.stringify(song))
  }

  return {getJamFromDb, getUserJamsFromDb, postNewJam, deleteJamFromDb, editJamInDb};
  
});



