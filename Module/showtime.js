const mongoose = require('mongoose');

const { Schema } = mongoose;
const showtimeSchema = new Schema({
  seates: {
    type: Array,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  timing: {
    type: Number,
    required: true,
    trim: true,
  },
  movieId: {
    type: String,
    ref: 'Movie',
    required: true,
  }
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
