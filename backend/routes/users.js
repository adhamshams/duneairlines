const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken")

const Users = require('../Models/Users');

// @route GET api/users
// @description Get all users
// @access Public
router.get('/', (req, res) => {
    Users.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

router.get('/auth', verifyJWT, (req, res) => {
  res.json({isLoggedIn: true, firstName: req.user.firstName, type: req.user.type});
})
  
// @route GET api/users/:id
// @description Get single user by id
// @access Public
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});
  
// @route POST api/users
// @description add users
// @access Public
router.post('/', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email.toLowerCase();
    const homeAddress = req.body.homeAddress;
    const telephoneNumber = req.body.telephoneNumber;
    const passportNumber = req.body.passportNumber;
    const password = await bcrypt.hash(req.body.password, 10);
    const type = req.body.type;
    const newUser = new Users({
        firstName,
        lastName,
        email,
        homeAddress,
        telephoneNumber,
        passportNumber,
        password,
        type,
    });
    Users.create(newUser)
      .then(user => res.json({ msg: 'User added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this User' }));
});
  
// @route PUT api/users/:id
// @description Update user
// @access Public
router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body)
      .then(user => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
});

// Sign in user
router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  Users.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: 'Email not found' });
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              firstName: user.firstName,
              type: user.type
            };

            // Sign token
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: 'Password incorrect' });
          }
        });
    });
});

function verifyJWT(req, res, next){
  const token = req.headers["x-access-token"]?.split(' ')[1]
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) return res.json({
        isLoggedIn:false,
        message: "Failed To Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id
      req.user.firstName = decoded.firstName
      req.user.type = decoded.type
      next()
    })
  } else{
    res.json({message: "Incorrect Token Given", isLoggedIn: false})
  }
}
  
module.exports = router;