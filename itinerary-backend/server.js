const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const port = 3000;
var cors = require("cors");

const mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose
  .connect("mongodb://localhost:27017/travelitinerary-app")
  .then(console.log("Mongoose Up"));
app.use(bodyParser.json());

const User = require("./models/users");
const Locations = require("./models/locations");
app.use(cors());

app.use(
  session({
    secret: "asdasd23123helloasdasddasdasdasd2e3234123",
    saveUninitialized: false,
    resave: false,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const resp = await User.findOne({ username });
  if (resp) {
    res.send({
      success: false,
      message: "Username already there",
    });
    return;
  }

  const user = new User({
    username,
    password,
  });
  const result = await user.save();
  req.session.username = username;
  req.session.save();
  res.send({
    success: true,
    message: "Registered Successful",
  });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const resp = await User.findOne({ username, password });
  console.log(resp);

  if (resp) {
    req.session.username = username;
    req.session.save();
    res.send({
      success: true,
      message: "Logged in Successful",
    });
  } else {
    res.send({
      success: false,
      message: "Login attempt failed!",
    });
  }
});

app.get("/api/isloggedin", (req, res) => {
  res.json({
    status: !!req.session.username,
  });
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({
    success: true,
  });
});

app.get("/api/mainlocations", async (req, res) => {
  const locationArray = [];
  console.log("Api is successful");
  const resp = await Locations.find();
  if (resp) {
    resp.map((value) => {
      locationArray.push(value.name);
    });
    res.send({
      success: true,
      message: locationArray,
    });
  } else {
    res.send({
      success: false,
      message: "Api failed! Error",
    });
  }
});


app.post("/api/sublocations", async (req, res) => {
  const {selectedMainLocation} = req.body;
  // console.log(req.body);
  const resp = await Locations.findOne({name:selectedMainLocation});
  // console.log(resp.subPlaces)
  if (resp) {
    
    res.send({
      success: true,
      message: resp.subPlaces
    });
  } else {
    res.send({
      success: false,
      message: "Api failed! Error",
    });
  }

  // console.log(resp)
});