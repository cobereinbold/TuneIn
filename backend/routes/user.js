const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/createUser", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  user
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
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
      res.send("User correct!");
    } else {
      res.status(500).send("Incorrect password");
    }
  });
});

module.exports = router;
