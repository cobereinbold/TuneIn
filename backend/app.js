const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/user");

app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoute);

//Connect to db
mongoose.connect(
  "mongodb+srv://SENG513User:SENG513Project@cluster0.3f7kyz4.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("Connected to database!");
  }
);

//Listen on port 5000
app.listen(5000);
