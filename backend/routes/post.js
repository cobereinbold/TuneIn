const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/createPost", async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });
  const date = new Date();

  if (user.dateLastPosted == date.toDateString()) {
    // User already posted today! Return error
    res.status(501).json({ message: "User already posted today" });
    return;
  } else {
    user.dateLastPosted = date.toDateString();
    user.daysPosted += 1;
    await user.save();
  }

  //Creates new post object
  const post = new Post({
    date: date.toDateString(),
    user: {
      userId: req.body.userId,
      username: req.body.username,
      profilePic: req.body.profilePic,
    },
    songInfo: {
      song: req.body.song,
      artist: req.body.artist,
      songLink: req.body.songLink,
      songImage: req.body.songImage,
    },
    caption: req.body.caption,
  });

  //Saves new post object to the database
  await post.save(async function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    } else {
      //Updates the users post date to the current date
      const filter = { _id: req.body.userId };
      const date = new Date();
      const update = { posted: date.toDateString() };
      await User.findOneAndUpdate(filter, update);

      //Returns success no matter what, since we've already made the post at this point
      res.status(200).json(result);
    }
  });
});

router.put("/likePost", async (req, res) => {
  const post = await Post.findOne({ _id: req.body.postId });

  if (post == null) {
    res.status(502).send("Could not find post: " + req.body.postId);
    return;
  }

  if (post.likes.users.includes(req.body.username)) {
    res.status(501).json({ message: "Liked already" });
    return;
  } else {
    post.likes.count = post.likes.count + 1;
    post.likes.users.push(req.body.username); // Push object onto array
  }

  //Saves new post object to the database
  await post.save(async function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/getAllPostsById", async (req, res) => {
  const posts = await Post.find({ "user.userId": req.body.userId });
  res.status(200).json(posts);
});

router.get("/getAllPosts", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

router.get("/getLikedPosts", async (req, res) => {
  const posts = await Post.find({ "likes.users": req.body.userId });
  res.status(200).json(posts);
});

module.exports = router;
