//TODO: generate and return cookie upon successful login
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
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

  //Update all the users posts, likes and comments to have the new users username
  if (foundUser.username !== req.body.username) {
    //Get all posts with this username
    const userPosts = await Post.find({ "user.username": foundUser.username });

    //Update all posts for user
    for (const post of userPosts) {
      if (post.user.username === foundUser.username) {
        post.user.username = req.body.username;
      }
      post.save();
    }

    //Get all likes with this username
    const userLikes = await Post.find({ "likes.users": foundUser.username });

    //Update all likes for user
    for (const post of userLikes) {
      for (let like of post.likes.users) {
        if (like === foundUser.username) {
          post.likes.users[post.likes.users.indexOf(like)] = req.body.username;
        }
      }
      post.save();
    }

    //Get all comments with this username
    const userComments = await Post.find({
      "comments.username": foundUser.username,
    });

    //Update all comments for user
    for (const post of userComments) {
      for (let comment of post.comments) {
        if (comment.username === foundUser.username) {
          post.comments[post.comments.indexOf(comment)].username =
            req.body.username;
        }
      }
      post.save();
    }
  }

  foundUser.username = req.body.username
    ? req.body.username
    : foundUser.username;
  foundUser.password = req.body.password
    ? encryptedPassword
    : foundUser.password;
  foundUser.firstName = req.body.firstName
    ? req.body.firstName
    : foundUser.firstName;
  foundUser.lastName = req.body.lastName
    ? req.body.lastName
    : foundUser.lastName;
  foundUser.favoriteGenre = foundUser.favoriteGenre;
  foundUser.profilePicture = req.body.profilePicture
    ? req.body.profilePicture
    : foundUser.profilePicture;

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

router.get("/getSomeUsers", async (req, res) => {
  const users = await User.find();
  users_info = [];

  for (index in users){
    users_info.push({
      username: users[index].username,
      firstName: users[index].firstName,
      lastName: users[index].lastName,
      profilePicture: users[index].profilePicture,
    });
  }
  console.log(users_info);
  res.status(200).json(users_info); // Returns success code 200, there will always be available users on this simple api call
});

router.put("/searchUser", async (req, res) => {
  const users = await User.find({username: req.body.username});
  users_info = [{
    username: users.username,
    firstName: users.firstName,
    lastName: users.lastName,
    profilePicture: users.profilePicture,
  }];
  console.log(users_info);
  res.status(200).json(users_info); // Returns success code 200, there will always be available users on this simple api call
});

module.exports = router;
