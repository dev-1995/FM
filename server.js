const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/users");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Setup
const db = require("./config/keys").mongoUrl;

//Connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(data => console.log("Connected to DB!"))
  .catch(err => err);

//Paspport middleware
app.use(passport.initialize());

//Passport Configuration
require("./config/passportConfig")(passport);
//Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Listen to Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
  if (err) throw new Error(err);
  console.log("Running at localhost:" + PORT);
});
