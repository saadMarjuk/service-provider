const express=require("express");
const router=express.Router();
const providerModel = require('../models/provider-model');
const isLoggedIn = require('../middlewares/isloggedin');
const multer = require('multer');


// Set up multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get("/",function(req,res){
    res.send("hey   ");

})


// Set up multer for memory storage


// Route to serve the create service form
router.get('/create', (req, res) => {
  res.render('createService');
});

// Route to create a new service
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    let { name, price, discount, personName, area, description } = req.body;
    let imageBuffer = req.file.buffer; // Get the image buffer from memory storage
    let createdProvider = await providerModel.create({
      image: imageBuffer.toString('base64'), // Save image as Base64 string
      name,
      price,
      discount,
      personName,
      area,
      description
    });
    res.redirect('/delete/list');
  } catch (error) {
    res.status(500).send('Error creating service: ' + error.message);
  }
});

// Route to serve the provider list 
router.get('/list', isLoggedIn,async (req, res) => {
 try { let providers = await providerModel.find();
     res.render('providerList', { providers }); }
      catch (error) { res.status(500).send('Error retrieving providers: ' + error.message);

       } 
    });


module.exports=router;
