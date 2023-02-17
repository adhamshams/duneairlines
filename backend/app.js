const express = require('express');
const connectDB = require('./db');
require('dotenv').config({ path: './config.env' })
var bodyParser = require('body-parser')
var cors = require('cors');

const port = process.env.PORT || 8082;
const app = express();

// parse applications
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }));

connectDB();

const bookings = require('./routes/bookings.js');
const flights = require('./routes/flights.js');
const users = require('./routes/users.js');

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/bookings', bookings);
app.use('/flights', flights);
app.use('/users', users);

app.listen(port, () => console.log(`Server running on port ${port}`));