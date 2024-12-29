const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Cart' },
  isadmin: Boolean,
  order: {
    type: Array,
    default: []
  },
  contract: Number,
  picture: String
});

module.exports = mongoose.model('User', userSchema);
