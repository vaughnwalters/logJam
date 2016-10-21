'use strict';

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { json } = require('body-parser');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/logjam'


app.use(express.static('client'));
app.use(json());


// GETS ALL THE MESSAGES BACK FROM DB
app.get('/api/getAll', (req, res) =>
  res.json({
    songs: [
      {
        userId: 1,
        title: 'santa2000',
        lyric: 'christmas time is here.  time for beer and cheer.',
        audio: 'santa2000jam'
      },
      {
        userId: 1,
        title: 'Barf-o-rama',
        lyric: 'ate a dank noodle.  puked on a poodle',
        audio: 'barf-o-ramajam'
      },
      {
        userId: 1,
        title: 'jim',
        lyric: 'dont eat that meat stick, snap into a new trick',
        audio: 'barf-o-ramajam'
      },
    ],
  })
)   


// SET UP MODEL FOR WHAT IS TO BE SENT TO DB ON FORM SUBMIT
const Song = mongoose.model('song', {
  userId: Number,
  title: String,
  lyric: String,
  audio: String
})

app.get('/api/songs', (req, res, err) =>
  Song
    .find()
    .then(songs => res.json({ songs }))
    .catch(err)
) 

// app.get('/api/getAll/getOne/:id', (req, res) =>
//   res.json({
//     messages: [
//       {
//         userId: 1,
//         title: 'santa2000',
//         lyric: 'christmas time is here.  time for beer and cheer.',
//         audio: 'santa2000jam'
//       },
//       {
//         userId: 1,
//         title: 'Barf-o-rama',
//         lyric: 'ate a dank noodle.  puked on a poodle',
//         audio: 'barf-o-ramajam'
//       },
//       {
//         userId: 1,
//         title: 'jim',
//         lyric: 'dont eat that meat stick, snap into a new trick',
//         audio: 'barf-o-ramajam'
//       },
//     ],
//   })
// )  



// POSTS NEW SONG TO DB
app.post('/api/newSong', (req, res, err) => {
  console.log("req.body", req.body);
  Song
    .create(req.body)
    .then(song => res.json(song))
    .catch(err)
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URL, () => { 
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
})
