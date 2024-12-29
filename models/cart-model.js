const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'provider',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema]
});

module.exports = mongoose.model('cart', cartSchema);
