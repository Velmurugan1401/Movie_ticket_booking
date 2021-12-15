const mongoose = require('mongoose');

const { Schema } = mongoose;
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  language: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  seates: {
    type: Number,
    default:15
   
  },
  genre: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  director: {
    type: String,
    trim: true,
    lowercase: true,
  },
  cast: {
    type: String,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
    lowercase: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createddate: {
    type: Date,
    default: Date.now, //default mean when the date not include the user insert data it taken the default time of system
  },
  lastupdateddate: {
      type: Date,
      default: Date.now,
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
