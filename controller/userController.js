const User = require('../model/user');
const Friendship = require('../model/friendship');
const _ = require('lodash');

const create = (req, res) => {	
	let params = req.body;
	// console.log(params);
	User.create(params)
		.then((user) => {
			user.password = "youdontneedtoknow";
			res.json(user);
		})
		.catch((error) => {	
			if (error.code === 11000) {
				res.status(406, "username, phonenumber or email are already taken");
			}
			res.json(error);
		});
}

const getUsers = (req,res) => {	
	User.find(req.query)
		.then((users) => {	
			res.json(users);
		})
		.catch((error) => {	
			res.json(error);
		});
}

const getUser = (req,res) => {	
	User.findById(req.params.id)
		.then((user) => {	
			res.json(user);
		})	
		.catch((error) => {	
			res.json(error);
		});
}

const getPosts = (req,res) => {	
	User.findById(req.params.id)
		.populate({
				path: 'blogs',
				populate: {
					path: 'comments',
					model: 'comment',
					populate: {
						path: 'author',
						model: 'user'
					}
				}
		})
		.sort({updated: -1})
		.then((user) => {	
			res.send(user.posts)
		})
		.catch((error) => {	
			res.json(error);
		});
}

const getFriends = (req,res) => {	
	Friendship.find({'$or' : [{'userOne': req.params.id}, 
		{'userTwo': req.params.id}]})
		.sort({_id: -1})
		.then((result) => {	
			res.json(result);
		})
		.catch((error) => {	
			res.json(error);
		})
}

const update = (req,res) => {	
	User.findByIdAndUpdate(req.params.id, req.body)
		.then((user) => {
			if (user) {
					res.send('OK')
				}	
			res.status(404);	
		})
		.catch((error) => {	
			res.json(error);
		});
}

const remove = (req,res) => {	
	User.findByIdAndRemove(req.params.id)
		.then(() => {	
		res.send('OK')
		})
		.catch((error) => {	
			res.json(error);
		});
}


module.exports = {
	create,
	remove,
	update,
	getUser,
	getUsers,
	getPosts,
	getFriends
}









