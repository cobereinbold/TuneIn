//TODO: generate and return cookie upon successful login
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

router.post("/createUser", async (req, res) => {
  //TODO: Check is user with given username already exists
 
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: encryptedPassword,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    favoriteGenre: req.body.favoriteGenre
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

router.post("/signInUser", async (req, res) => {
  const foundUser = await User.findOne({username: req.body.username});

  if (!foundUser) {
    res.status(500).send("User not found.");
    return;
  }

  const passwordMatch = await bcrypt.compare(req.body.password, foundUser.password);

  if (passwordMatch) {
    req.session.isAuth = true;
    res.status(200).json({
      username: foundUser.username,
    });
  } else {
    res.status(500).send("Incorrect password");
  }
});

module.exports = router;
