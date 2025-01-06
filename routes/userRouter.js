const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController'); 
const { login } = require('../controllers/loginController');
// Route to test if the router is working
router.get('/', (req, res) => {
    res.send('hey working router');
});




// Serve the registration page
router.get('/register', (req, res) => {
  res.render('register'); // Render the register.ejs
});

// Serve the login page
router.get('/login', (req, res) => {
  res.render('login'); // Render the login.ejs
});

// Route to register a new user

router.get('/logout', (req, res) => {
     res.clearCookie('token');
      res.redirect('/user/login');
     // Redirect to the login page 
     });



 

// Route to register a new user
router.post('/register', register);

// Route to login a user
router.post('/login', login);

module.exports = router;







