'use strict';

const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')

const { json } = require('body-parser');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/logjam';

const User = require('./models/user');
const Song = require('./models/song');

app.use(express.static('client'));
app.use(json());


// app.locals.errors = {} // errors & body added to avoid guard statements
// app.locals.body = {} // i.e. value=(body && body.name) vs. value=body.name



// middlewares (transform stream)

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'logjam',
  resave: false,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  console.log("req.session", req.session );
  app.locals.email = req.session && req.session.email;
  app.locals.displayName = req.session && req.session.displayName;
  app.locals.userId = req.session && req.session.userId;
  next()
})
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({extended: false}))






// REGISTER USER
app.post('/register', ({ body: { displayName, email, password, confirmation } }, res, err) => {
  console.log("displayName", displayName);
  console.log("email", email);
  console.log("password", password);
  console.log("confirmation", confirmation);
  if (password === confirmation) {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.status(403).json({ msg: 'Email is already registered' })
          } else {
          return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                reject(err)
              } else {
                resolve(hash)
              }
            })
          })
          .then(hash => User.create({ displayName, email, password: hash }))
          .then(() => res.status(201).json({msg: `${displayName} is now a registered user`}))
          .catch(err)
        }
      })
  } else { 
    res.status(400).json({ msg: 'Password & password confirmation do not match' })
  }
})

// in postman to register new user
// {
//   "displayName": "Z", 
//   "email": "z@z.com",
//     "password": "zzzzzz",
//     "confirmation": "zzzzzz"
// }

// LOGIN USER
app.post('/login', ({session, body: {email, password}}, res, err) => {
  // find a user by email and then return that user
  User.findOne({email})
    .then(user => {
      if (user) {
        // set name on the user to be stored in the cookies for the session
        session.displayName = user.displayName
        session.userId = user._id
        console.log("session", session);
        // res.end();
        return new Promise((resolve, reject)=> {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err){
              reject(err)
            } else {
              resolve(matches)
            }
          })
        })
        .then((matches) => {
          // res.end();
          if (matches) {
            res.status(200).json({userId: session.userId, displayName: session.displayName})
          } else {
            res.status(400).json({msg:'Password does not match'})
          }
        })
      } else {
        res.status(400).json({msg: 'Email is not found'})
      }
    })
    .catch(err)
})

app.get('/session', (req, res) => {
  console.log("req.session", req.session);
  res.end();
})

// LOGOUT USER
app.get('/logout', (req,res) => {
  console.log("logout in sserver");
  req.session.destroy( err => {
    if (err) throw err
    res.status(200).json({ msg: 'user logged out sucessfully'})
  })
})

// GETS ALL THE SONGS BACK FROM THE DB FOR EACH USER
// if user passed in to the req.params matches user on the song, 
// push the song into a new array and send that array as the res to the req
app.get('/api/getAll/', (req, res, err) => {
  let userSongArr = [];
  Song
    .find(req.session.userId)
    .then((songArr) => {
      for (var i = 0; i < songArr.length; i++) {
        if (req.session.userId === songArr[i].userId) {
          userSongArr.push(songArr[i]);
        }
      }
      res.status(200).json({ userSongArr })
    })
    .catch(err)
}); 


// FIND ONE SONG BY ID AND RETURN THAT SONG
app.get('/api/getOne/:id', (req, res, err) => {
// app.get('/api/getOne/', (req, res, err) => {
  let songId = req.params.id;
  Song
    // .find()
    .findById(songId)
    .then(songs => res.status(200).json({ songs }))
    .catch(err)
});
 

// POSTS NEW SONG TO DB
app.post('/api/newSong', (req, res, err) => {
  req.body.userId = req.session.userId
  console.log("req.body", req.body);
  console.log("req.session.userId in post", req.session.userId);
  // app.locals.userId = req.session.userId;
  // req.body.userId = app.locals.userId;
  Song
    .create(req.body)
    .then(song => res.status(201).json(song))
    .catch(err)
});


// // DELETE SONG FROM DB
app.get('/api/deleteSong/:id', (req, res, err) => {
  let id = {
    _id: req.params.id
  };
  Song.remove(id, function(err, songs){
    if(err){
      console.log("it broke");                
    }
    else{                
      console.log("song removed");
    }
  })
  .then(() => res.status(200).json({msg: "song deleted in DB"}));
})

// UPDATE SONG LYRICS
app.put('/api/updateSong/:id', (req, res, err) => {
  console.log("req.session", req.session.userId);
  let id = {
    _id: req.params.id
  };
  Song.findOneAndUpdate(id, {$set:{
    title: req.body.title,
    lyric: req.body.lyric,
    audio: req.body.audio
  }, returnNewDocument: true}, {new: true})
  .then((song) => {
    console.log('updated song', song)
    res.status(200).json(song)
  })
  .catch(err)
});



mongoose.Promise = Promise;

mongoose.connect(MONGODB_URL, () => { 
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
})
