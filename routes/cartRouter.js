const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isloggedin');
const cartModel = require('../models/cart-model');

// Route to add a service to the cart
router.post('/add', isLoggedIn, async (req, res) => {
  try {
    const { serviceId } = req.body;
    const userId = req.user._id;
    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.service.toString() === serviceId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ service: serviceId });
    }

    await cart.save();
    res.redirect('/cart/view');
  } catch (error) {
    res.status(500).send('Error adding to cart: ' + error.message);
  }
});

// Route to view the cart
router.get('/view', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ user: userId }).populate('items.service');
    res.render('cartView', { cart });
  } catch (error) {
    res.status(500).send('Error retrieving cart: ' + error.message);
  }
});

module.exports = router;
