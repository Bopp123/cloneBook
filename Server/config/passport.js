const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../model/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username })
    .select('+password')
    	.then((user) => {	
			// Return if user not found in database
			if (!user) { return done(null, false); }
			// Return if password is wrong
			if (user.generateHash(password) !== user.password) { 
				return done(null, false); }
			// If credentials are correct, return the user object
			return done(null, user);
    	})
    	.catch((error) => {	
    		return done(err);
    	})
  }
));