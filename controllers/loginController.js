const express = require('express');

const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key"; 



exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user) return res.status(401).send('Email or Password incorrect');

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send('Email or Password incorrect');

        let token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/service'); // Redirect to the service page
        //res.status(200);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error: ' + error.message);
    }
};
