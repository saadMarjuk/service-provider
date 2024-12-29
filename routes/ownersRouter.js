const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

// Route to create a new owner
router.post('/create', async (req, res) => {
  try {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res.status(503).send("You do not have permission to create a new user");
    }

    let { fullname, email, password } = req.body; // Use values from req.body
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password
    });
    res.status(201).send(createdOwner);
  } catch (error) {
    res.status(500).send('Error creating owner: ' + error.message);
  }
});

// Route to test if the router is working
router.get("/", async (req, res) => {
  try {
    /*let owners = await ownerModel.find();
    res.status(200).json(owners);*/
    res.send("yoyoyoyoy")
  } catch (error) {
    res.status(500).send('Error retrieving owners: ' + error.message);
  }
});

module.exports = router