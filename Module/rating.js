const mongoose = require('mongoose');

const { Schema } = mongoose;

const Rating = new Schema({
  MovieId: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  createddate: {
    type: Date,
    default: Date.now, //default mean when the date not include the user insert data it taken the default time of system
  },
  lastupdateddate: {
      type: Date,
      default: Date.now,
    }
});

const Ratings = mongoose.model('Ratings', Rating);

module.exports = Ratings;
