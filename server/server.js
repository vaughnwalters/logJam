'use strict';

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const { json } = require('body-parser');


app.use(express.static('client'));


// GETS ALL THE MESSAGES BACK FROM DB
app.get('/api/getAll', (req, res) =>
  res.json({
    messages: [
      {
        id: 1,
        title: 'santa2000',
        lyric: 'christmas time is here.  time for beer and cheer.',
        audio: 'santa2000jam'
      },
      {
        id: 2,
        title: 'Barf-o-rama',
        lyric: 'ate a dank noodle.  puked on a poodle',
        audio: 'barf-o-ramajam'
      },
      {
        id: 3,
        title: 'jim',
        lyric: 'dont eat that meat stick, snap into a new trick',
        audio: 'barf-o-ramajam'
      },
    ],
  })
)   

// SET UP MODEL FOR WHAT IS TO BE SENT TO DB ON FORM SUBMIT
const Song = mongoose.model('song', {
  id: String,
  title: String,
  lyric: String,
  audio: String
})

// POSTS NEW SONG TO DB
app.post('/api/newSong', (req, res, err) =>
  Song
    .create(req.body)
    .then(msg => res.json(msg))
    .catch(err)
)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

mongoose.Promise = Promise;


app.listen(port, () => console.log(`Listening on port: ${port}`));
