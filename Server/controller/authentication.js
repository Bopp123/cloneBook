const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../model/user');

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
    let token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "id": user._id
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};
