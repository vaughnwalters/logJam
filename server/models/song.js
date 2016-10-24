'use strict';

const mongoose = require('mongoose');


// SET UP MODEL FOR WHAT IS TO BE SENT TO DB ON FORM SUBMIT
module.exports = mongoose.model('Song', {
  userId: String,
  title: String,
  lyric: String,
  audio: String
});
