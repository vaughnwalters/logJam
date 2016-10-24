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


app.locals.errors = {} // errors & body added to avoid guard statements
app.locals.body = {} // i.e. value=(body && body.name) vs. value=body.name



// middlewares
app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'logjam',
  resave: true,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  console.log("req.session", req.session );
  app.locals.userId = req.session && req.session.userId;
  app.locals.displayName = req.session && req.session.displayName;
  next()
})
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))





// LOGIN USER
app.post('/login', ({session, body: {email, password}}, res, err) => {
  User.findOne({email})
    .then(user => {
      console.log("user", user._id);
      app.locals.userId = user._id
      if (user) {
        return new Promise((resolve, reject)=> {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err){
              reject(err)
            } else {
              resolve(matches)
            }
          })
        })
      } else {
        res.json({msg: 'Email is not found'})
      }
    })
    .then((matches) => {
      if (matches) {
        session.displayName = app.locals.displayName;
        console.log("app.locals.userId", app.locals.userId);
        session.userId = app.locals.userId;
        res.json({msg:`${app.locals.userId} logged in`})
      } else {
        res.json({msg:'Password does not match'})
      }
    })
    .catch(err)
})

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
          res.json({ msg: 'Email is already registered' })
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
          .then(() => res.json({msg: `${displayName} is now a registered user`}))
          .catch(err)
        }
      })
  } else { 
    res.json({ msg: 'Password & password confirmation do not match' })
  }
})

// in postman to register new user
// {
//   "displayName": "A",
//   "email": "a@a.com",
//     "password": "aaaaaa",
//     "confirmation": "aaaaaa"
// }


// LOGOUT USER
app.get('/logout', (req,res) => {
  req.session.destroy( err => {
    if (err) throw err
    res.json({ msg: 'user logged out sucessfully'})
  })
})

// POSTS NEW SONG TO DB
app.post('/api/newSong', (req, res, err) => {
  console.log("app.locals.userId", app.locals.userId);
  req.body.userId = app.locals.userId;
  console.log("req.body.email", req.body.userId);
  Song
    .create(req.body)
    .then(song => res.json(song))
    .catch(err)
});

// GETS ALL THE SONGS BACK FROM THE DB
app.get('/api/getAll', (req, res, err) => {
  Song
    .find()
    .then(songs => res.json({ songs }))
    .catch(err)
}); 


// FIND ONE SONG BY ID AND RETURN THAT SONG
app.get('/api/getOne/:id', (req, res, err) => {
  let songId = req.params.id;
  Song
    .findById(songId)
    .then(songs => res.json({ songs }))
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
  .then(() => res.send("song deleted in DB"));
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    


// UPDATE SONG LYRICS
app.patch('/api/updateSong/:id', (req, res, err) => {
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
    res.json(song)
  })
  .catch(err)
});



mongoose.Promise = Promise;

mongoose.connect(MONGODB_URL, () => { 
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
})
