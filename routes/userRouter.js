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






// Route to register a new user
/*router.post("/register", async function (req, res) {
    try {
        let {  fullname,email,password } = req.body;
        let user=await userModel.findOne({email:email});
        if(user) return res.status(401).send("you already have a account");

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt,  async function (err, hash) {
              if (err) return res.send(err.message);
              else {
                let user = await userModel.create({
    
            
                    fullname,
                    email,
                    password:hash
               });
        
              let token =jwt .sign({ email:user.email,id:user._id},"saad");
              res.cookie("token",token);
              res.send("user created successfully");
              };
            });
          });
      
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error registering user: ' + err.message); // Send error message with 500 status code
    }
});



router.post("/login", async function (req, res) {
    try {
        let { email, password } = req.body;

        // Find user by email
        let user = await userModel.findOne({ email: email });
        if (!user) return res.status(401).send("Email or Password incorrect");

        // Compare the provided password with the hashed password
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) return res.status(500).send("Error comparing passwords");

            if (result) {
                // Generate a token
                let token = jwt.sign(
                    { email: user.email, id: user._id },
                    "saad" // Secret from the generateToken function
                );

                // Set token as cookie and send success response
                res.cookie("token", token);
                return res.status(200).send("Login successful");
            } else {
                return res.status(401).send("Email or Password incorrect");
            }
        });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});
*/



module.exports = router;
