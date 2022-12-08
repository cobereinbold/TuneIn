const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const sessions = require('express-session');
const MongoDBSessionStore = require('connect-mongodb-session')(sessions);


//Connect to db
mongoose.connect(
  process.env.MONGO_URI,
  () => {
    console.log("Connected to database!");
  }
);

const sessionStore = new MongoDBSessionStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
})

const userRoute = require("./routes/user");

app.use(bodyParser.json());
app.use(cors());
app.use(sessions({
  secret: 'supersecret',
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60 },
  resave: false,
  store: sessionStore
}))

const isAuth = (req, res, next) => {
  if(req.session.isAuth) {
    next();
  } else {
    res.redirect('/user/signInUser')
  }
}

app.use("/user", userRoute);

app.get('/home', isAuth, (req, res) => {
  res.send('homepage woo');
});


//Listen on port 5000
app.listen(5000);
