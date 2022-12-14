const User = require('../models/users');
// const { normalizeErrors } = require('../helpers/mongoose');
// const jwt = require('jsonwebtoken');
const config = require('../config');


exports.registerUser = (req, res) => {
    // console.log(req.body)
    const { name, email, username, password } = req.body;
    User.findOne({username}, function(err, existingUser) {
      if (err) {
        return res.status(422).send({success: false, message: err.errors});
      }
  
      if (existingUser) {
        return res.status(422).send({ success: false,
          message: "Username already there"});
      }

      const user = new User({
        name,
        email,
        username,
        password
      });
      user.save(function(err) {
        if (err) {
          return res.status(422).send({success: false, message: err.errors});
        }
        req.session.username = username;
      req.session.save();
  
        return res.json({success: true,
          message: "Registered Successful"});
      });



    })
    
        
     
    }

exports.loginUser = async (req, res) => {
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
  }

exports.getUsers = async (req, res) => {
    const resp = await User.find({}, {"_id": 0, "username": 1, "email":2});
    // console.log(resp)
    if (resp) {
      res.send({
        success: true,
        message: resp,
      });
    } else {
      res.send({
        success: false,
        message: "Api failed! Error",
      });
    }
  }