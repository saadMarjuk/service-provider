const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isloggedin');


// Serve the index page
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/service', isLoggedIn, (req, res) => { 
    res.render('service', { user: req.user });
    //  Pass user info to the service.ejs 
    });


module.exports = router;
