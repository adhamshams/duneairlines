const express = require('express');
const router = express.Router();

const Flights = require('../Models/Flights');

// @route GET api/flights
// @description Get all flights
// @access Public
router.get('/', (req, res) => {
    Flights.find()
      .then(flights => res.json(flights))
      .catch(err => res.status(404).json({ noflightsfound: 'No Flights found' }));
});

// @route GET api/flights/:id
// @description Get single flight by id
// @access Public
router.get('/:id', (req, res) => {
    Flights.findById(req.params.id)
      .then(flight => res.json(flight))
      .catch(err => res.status(404).json({ noflightfound: 'No Flight found' }));
});

// @route POST api/flights
// @description add flight
// @access Public
router.post('/', (req, res) => {
    Flights.create(req.body)
      .then(Flight => res.json({ msg: 'Flight added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this flight' }));
});

// @route POST api/flights
// @description search flight
// @access Public
router.post('/search', (req, res) => {
    var terms = {};
    for(elem in req.body){
      if(!isNullorWhiteSpace(req.body[elem])){
        terms[elem] = req.body[elem];
      }
    }
    Flights.find(terms)
    .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});

// @route PUT api/flights/:id
// @description Update flight
// @access Public
router.put('/:id', (req, res) => {
    Flights.findByIdAndUpdate(req.params.id, req.body)
      .then(flight => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
});

function isNullorWhiteSpace(string) {
    if (string == null) {
      return true;
    }
    if (typeof (string) != "string") {
      return false;
    };
  
    const x = string.trim();
    return x.length === 0;
}

module.exports = router;
  