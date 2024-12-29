const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key"; // Replace this with your actual secret key

// Controller for user registration
exports.register  = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send('You already have an account');

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user = await userModel.create({
            fullname,
            email,
            password: hash
        });

        let token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET);
        res.cookie('token', token);
        res.send('User created successfully');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user: ' + err.message);
    }
};



