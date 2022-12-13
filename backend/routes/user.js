const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const isAuth = require("../auth.js");

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

  // the following saves the user to the db
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

router.get("/hasPostedToday", isAuth, async (req, res) => {
  const foundUser = await User.findOne({ _id: req.body.userId });
  const date = new Date();

  if (foundUser.dateLastPosted == date.toDateString()) {
    res.status(500).send("User has posted today"); // Returns error code 500
    return;
  } else {
    res.status(200).send("User has not posted today"); // Returns success code 200
  }
});

router.put("/updateUser", isAuth, async (req, res) => {
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

  await foundUser.save(function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
});

router.get("/getSomeUsers", isAuth, async (req, res) => {
  const users = await User.find();
  users_info = [];

  for (index in users) {
    if (!users[index].isAdmin) {
      users_info.push({
        _id: users[index]._id.toHexString(),
        username: users[index].username,
        firstName: users[index].firstName,
        lastName: users[index].lastName,
        profilePicture: users[index].profilePicture,
      });
    }
  }
  res.status(200).json(users_info);
});

router.put("/searchUser", isAuth, async (req, res) => {
  const users = await User.find({ username: req.body.username });
  users_info = [];

  for (index in users) {
    if (!users[index].isAdmin) {
      users_info.push({
        _id: users[index]._id.toHexString(),
        username: users[index].username,
        firstName: users[index].firstName,
        lastName: users[index].lastName,
        profilePicture: users[index].profilePicture,
      });
    }
  }
  res.status(200).json(users_info); // Returns success code 200, there will always be available users on this simple api call
});

router.get("/allUserInfo", isAuth, async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.put("/userInfoById", isAuth, async (req, res) => {
  const users = await User.find({ _id: req.body.userId });
  res.status(200).json(users);
});

//destroys the session cookie, logging the user out of the api.
router.post("/logout", isAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Logout failed");
    }
    res.clearCookie("connect.sid");
    res.status(200).send("Logged out successfully");
  });
});

router.delete("/deleteUser", isAuth, async (req, res) => {
  await User.deleteOne({ _id: req.body.userId })
    .then(function () {
      res.status(200);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
