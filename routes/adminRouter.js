const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');
const isAdmin = require('../middlewares/isAdmin');
 // Middleware to verify admin

// Admin login route
router.get('/login', (req, res) => {
  res.render('adminLogin');
});

router.post('/login', adminLogin);

// Protected route example
/*router.get('/', isAdmin, (req, res) => {
  res.render('adminDashboard');
});*/

module.exports = router;
