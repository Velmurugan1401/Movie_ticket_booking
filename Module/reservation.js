const mongoose = require('mongoose');

const { Schema } = mongoose;
const reservationSchema = new Schema({
  dateandtime: {
    type: Date,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  showtime: {
    type: String,
    required: true,
  },
  seatno: {
    type:Number,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number
  },
  movieId: {
    type: String,
    required: true,
  },
  username: {
    type: String
  },
  userId: {
    type: String,
    required: true,
  },
  phone: {
    type: String
  },
  createddate: {
    type: Date,
    default: Date.now, //default mean when the date not include the user insert data it taken the default time of system
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
