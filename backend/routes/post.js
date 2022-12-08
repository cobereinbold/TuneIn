const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/createPost", async (req, res) => {
  //Creates ne post object
  const post = new Post({
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

module.exports = router;
