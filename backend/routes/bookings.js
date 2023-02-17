const express = require('express');
const router = express.Router();

const Bookings = require('../Models/Bookings');
const Flights = require('../Models/Flights');

// @route GET api/bookings
// @description Get all bookings
// @access Public
router.get('/', (req, res) => {
  Bookings.find()
    .then(bookings => res.json(bookings))
    .catch(err => res.status(404).json({ nobookingsfound: 'No Bookings found' }));
});

// @route GET api/bookings/:id
// @description Get single booking by id
// @access Public
router.get('/:id', (req, res) => {
  Bookings.findById(req.params.id)
    .then(booking => res.json(booking))
    .catch(err => res.status(404).json({ nobookingfound: 'No Booking found' }));
});

// @route POST api/bookings
// @description add booking
// @access Public
router.post('/', (req, res) => {
  Bookings.create(req.body)
    .then(booking => res.json({ msg: 'Booking added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

// @route PUT api/bookings/:id
// @description Update booking
// @access Public
router.put('/:id', (req, res) => {
  Bookings.findByIdAndUpdate(req.params.id, req.body)
    .then(booking => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route DELETE api/bookings/:id
// @description Delete booking by id
// @access Public
router.delete('/:id', (req, res) => {
  Bookings.findByIdAndRemove(req.params.id, req.body)
    .then(booking => {
      Flights.findByIdAndUpdate(booking.departFlightID, {
        $pullAll:{
          seatsBooked: booking.departFlightSeats 
        }
      })
      .then(result => res.json({msg: "Departure seats updated"}))
      .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
      Flights.findByIdAndUpdate(booking.returnFlightID,{
        $pullAll:{
          seatsBooked: booking.returnFlightSeats
        }
      })
      .then(result => res.json({msg: "Return seats updated"}))
      .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
    })
    .catch(err => res.status(404).json({ error: 'No such booking!' }));
});

module.exports = router;