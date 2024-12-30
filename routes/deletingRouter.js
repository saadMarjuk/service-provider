const express = require('express');
const router = express.Router();
const providerModel = require('../models/provider-model');

// Route to serve the deleting list 
router.get('/list', async (req, res) => {
  try {
    let providers = await providerModel.find();
    res.render('deletService', { providers });
  } catch (error) {
    res.status(500).send('Error retrieving providers: ' + error.message);
  }
});

// Route to delete a service
router.post('/delete/:id', async (req, res) => {
  try {
    let providerId = req.params.id;
    await providerModel.findByIdAndDelete(providerId);
    res.redirect('/delete/list');
  } catch (error) {
    res.status(500).send('Error deleting service: ' + error.message);
  }
});

module.exports = router;
