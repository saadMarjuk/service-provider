/*const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "something went wrong.");
    res.redirect("/");
  }
};*/


const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const JWT_SECRET = "your_secret_key"; // Replace this with your actual secret key

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, JWT_SECRET);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    req.flash("error", "Something went wrong.");
    res.redirect("/");
  }
};
