const mongoose = require("mongoose");

//The Post schema for our database.
const PostSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  user: {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
  },
  songInfo: {
    song: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    songLink: {
      type: String,
      required: true,
    },
    songImage: {
      type: String,
      required: true,
    },
  },
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    users: {
      type: Array,
      default: [],
    },
  },
  caption: {
    type: String,
    default: "",
  },
  comments: [
    {
      username: String,
      comment: String,
    },
  ],
});

module.exports = mongoose.model("Posts", PostSchema);
