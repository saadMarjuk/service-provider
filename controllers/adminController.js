const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_jwt_secret"; // Replace with your actual secret key
const adminCredentials = { 
  email: "admin@gmail.com", // Replace with your actual admin email
  password: "1234" // Replace with your actual admin password
};

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === adminCredentials.email && password === adminCredentials.password) {
    const token = jwt.sign({ email: adminCredentials.email }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } else {
    res.status(401).send('Invalid admin credentials');
  }
};
