
const express = require('express');

const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('dotenv').config();

// Use this to replace the line causing the warning

const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const PORT = 3000;
const indexRouter=require("./routes/indexRouter");
const ownersRouter=require("./routes/ownersRouter");
const userRouter=require("./routes/userRouter");
const providerRouter=require("./routes/providerRouter")
const cartRouter = require("./routes/cartRouter"); 
const deletingRouter = require('./routes/deletingRouter');
const adminRouter = require('./routes/adminRouter'); // Admin routes
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(express.static(__dirname));


app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(session({
  secret: 'a very secret for testing', 
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

const adminCredentials = {
   email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD }; 
    // Make admin credentials available throughout the app 
app.locals.adminCredentials = adminCredentials;


app.set("view engine","ejs");
app.use("/",indexRouter);
app.use("/owner",ownersRouter);
app.use("/user",userRouter);
app.use("/provider",providerRouter);
app.use("/cart", cartRouter); 
app.use('/delete', deletingRouter);
app.use('/admin', adminRouter); // Admin routes





mongoose.connect('mongodb+srv://saad:1234@cluster0.1uypx.mongodb.net/service', {
  // useNewUrlParser and useUnifiedTopology are no longer needed
  serverSelectionTimeoutMS: 10000 // 10 seconds
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

console.log(typeof cartRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
