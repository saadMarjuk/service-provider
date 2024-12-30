// routes/adminRouter.js
const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');

// Admin login route
router.get('/login', (req, res) => {
  res.render('adminLogin');
});

router.post('/login', adminLogin);

module.exports = router;

