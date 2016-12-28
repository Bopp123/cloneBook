const userServices = require('./userServices');
const postServices = require('./postServices');
const friendshipServices = require('./friendshipServices');
const commentServices = require('./commentServices');
var jwt = require('express-jwt');
const secret = require('../config/secrets.json');

var auth = jwt({
  secret: secret.token,
});

module.exports = (app) => {	
	
	/**
	USER services
	-------------
	**/
	userServices(app,auth);
	
	/**
	POST services
	-------------
	**/
	postServices(app,auth);
	
	/**
	FRIENDSHIP services
	-------------
	**/
	friendshipServices(app,auth);

	/**
	COMMENTS services
	-------------
	**/
	commentServices(app,auth);
};