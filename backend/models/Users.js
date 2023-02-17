const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  homeAddress: {
    type: String,
    required: true
  },
  telephoneNumber: {
    type: String,
    required: true
  },
  passportNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bookings: {
    type: Array,
    required: false
  },
  type: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;