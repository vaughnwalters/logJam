'use strict';

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { json } = require('body-parser');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/logjam';


app.use(express.static('client'));
app.use(json());


// SET UP MODEL FOR WHAT IS TO BE SENT TO DB ON FORM SUBMIT
const Song = mongoose.model('song', {
  userId: String,
  title: String,
  lyric: String,
  audio: String
});

// GETS ALL THE SONGS BACK FROM THE DB
app.get('/api/getAll', (req, res, err) => {
  Song
    .find()
    .then(songs => res.json({ songs }))
    .catch(err)
}); 

// FIND ONE SONG BY ID AND RETURN THAT SONG
app.get('/api/getOne/:id', (req, res) => {
  let songId = req.params.id;
  Song
    .findById(songId)
    .then(songs => res.json({ songs }))
});
 

// POSTS NEW SONG TO DB
app.post('/api/newSong', (req, res, err) => {
  console.log("req.body", req.body);
  Song
    .create(req.body)
    .then(song => res.json(song))
    .catch(err)
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URL, () => { 
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
})
