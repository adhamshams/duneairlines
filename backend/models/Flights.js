const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightsSchema = new Schema({
    flightNumber:{
      type: String,
      required: false,
    },
    airportTerminal:{
      type:String,
      required: false,
    },
    departureTime:{
      type:String,
      required: false,
    },
    arrivalTime:{
      type: String,
      required: false,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true
    },
    flightDate: {
      type: Date,
      required: true,
    },
    cabin: {
      type: String,
      required: true
    },
    seatsAvailableOnFlight: {
      type: Number,
      required: true
    },
    seatsBooked: {
      type: Array,
      required: false
    },
    baggageAllowance: {
      type: Number,
      required: false
    },
    price: {
      type: Number,
      required: false
    }
  }, { timestamps: true });
  
  const Flights = mongoose.model('Flights', flightsSchema);
  module.exports = Flights;