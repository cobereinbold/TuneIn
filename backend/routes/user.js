//TODO: generate and return cookie upon successful login
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
//const bcrypt = require('bcrypt');

router.post("/createUser", (req, res) => {
  //const encryptedPassword = bcrypt.hash(password, 10); can add later maybe, not certain we need
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  // the following saves the user and generates a JWT for that user.
  user
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

router.post("/signInUser", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (!foundUser) {
      res.status(500).send("User not found.");
      return;
    }
    if (foundUser.password === req.body.password) {
      req.session.isAuth = true;
      res.status(200).json({
        username: foundUser.username,
      });
    } else {
      res.status(500).send("Incorrect password");
    }
  });
});

module.exports = router;
