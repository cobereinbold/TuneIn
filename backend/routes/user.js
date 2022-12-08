//TODO: generate and return cookie upon successful login
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

router.post("/createUser", async (req, res) => {
  const potentialUser = await User.findOne({username: req.body.username});
  if(potentialUser != null){
    res.status(500).send("User exists: " + potentialUser.username);
    return;
  }
  
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: encryptedPassword,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    favoriteGenre: req.body.favoriteGenre
  });

  // the following saves the user and generates a JWT (JSON Web Token) for that user.
  await user.save(function(err,result){
    if (err){
      console.log(err);
      res.status(500).json({ message: err });
    }
    else{
      res.status(200).json(result);
    }
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
  } 
  else {
    res.status(500).send("Incorrect password");
  }
});

module.exports = router;
