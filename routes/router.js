const userServices = require('./userServices');
const postServices = require('./postServices');
const friendshipServices = require('./friendshipServices');
const commentServices = require('./commentServices');

module.exports = (app) => {	
	
	/**
	USER services
	-------------
	**/
	userServices(app);
	
	/**
	POST services
	-------------
	**/
	postServices(app);
	
	/**
	FRIENDSHIP services
	-------------
	**/
	friendshipServices(app);

	/**
	COMMENTS services
	-------------
	**/
	commentServices(app);
};