const UserController = require('../controller/userController');

module.exports = (app) => {	
	//GET all users
	//returns a list of users filtered by given crieria
	app.get('/data/user', UserController.getUsers);

	//GET user by ID
	//returns one user wih given id
	app.get('/data/user/:id', UserController.getUser);

	//GET all posts of one user
	//returns all posts of given user
	app.get('/data/user/:id/posts', UserController.getPosts);

	//GET all friends for user
	//returns all friends of given user
	app.get('/data/user/:id/friends', UserController.getFriends);

	//POST new user
	//creates a new user from given request.body object
	app.post('/data/user', UserController.create);

	//PUT user
	//updates a given user
	app.put('/data/user/:id', UserController.update);

	//DELETE user
	//deletes a given user
	app.delete('/data/user/:id', UserController.remove);
}
