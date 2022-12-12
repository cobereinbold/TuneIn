//TODO: generate and return cookie upon successful login
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/createUser", async (req, res) => {
  // Duplicated Email
  const email = await User.findOne({ email: req.body.email });
  if (email != null) {
    res.status(502).send("Email used: " + email.email);
    return;
  }

  // Duplicated Username
  const potentialUser = await User.findOne({ username: req.body.username });
  if (potentialUser != null) {
    res.status(501).send("User exists: " + potentialUser.username);
    return;
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const date = new Date();

  const user = new User({
    username: req.body.username,
    password: encryptedPassword,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    favoriteGenre: req.body.favoriteGenre,
    profilePicture: req.body.profilePicture,
    dateJoined: date.toDateString(),
  });

  // the following saves the user and generates a JWT (JSON Web Token) for that user.
  await user.save(function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/signInUser", async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username });

  if (!foundUser) {
    res.status(501).send("User not found.");
    return;
  }

  const passwordMatch = await bcrypt.compare(
    req.body.password,
    foundUser.password
  );

  if (passwordMatch) {
    req.session.isAuth = true;
    res.status(200).json({
      user: foundUser,
    });
  } else {
    res.status(500).send("Incorrect password");
  }
});

router.get("/hasPostedToday", async (req, res) => {
  const foundUser = await User.findOne({ _id: req.body.userId });
  const date = new Date();

  if (foundUser.dateLastPosted == date.toDateString()) {
    res.status(500).send("User has posted today"); // Returns error code 500
    return;
  } else {
    res.status(200).send("User has not posted today"); // Returns success code 200
  }
});

router.put("/updateUser", async (req, res) => {
  const foundUser = await User.findOne({ _id: req.body.userId });

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  foundUser.username = req.body.username;
  foundUser.password = encryptedPassword;
  foundUser.firstName = req.body.firstName;
  foundUser.lastName = req.body.lastName;
  foundUser.favoriteGenre = req.body.favoriteGenre;
  foundUser.profilePicture = req.body.profilePicture;

  // the following saves the user and generates a JWT (JSON Web Token) for that user.
  await foundUser.save(function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
