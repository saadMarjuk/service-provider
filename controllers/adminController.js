// controllers/adminController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = "your_jwt_secret"; // Make sure to store this in your .env file

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const adminCredentials = req.app.locals.adminCredentials;

  if (email === adminCredentials.email && password === adminCredentials.password) {
    const token = jwt.sign({ email: adminCredentials.email }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/admin/dashboard');
  } else {
    res.status(401).send('Invalid admin credentials');
  }
};
