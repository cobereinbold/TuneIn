const mongoose = require("mongoose");

//The User schema for our database.
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateLastPosted: {
    type: String,
    default: "",
  },
  dateJoined: {
    type: String,
    required: true,
    default: "",
  },
  daysPosted: {
    type: Number,
    default: 0,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Users", UserSchema);
