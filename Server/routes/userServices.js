const UserController = require('../controller/userController');
const Authentication = require('../controller/authentication');
const multer = require("multer")();

module.exports = (app, auth) => {	

	app.post('/clonebook/data/login', Authentication.login);

	//GET all users
	//returns a list of users filtered by given criteria
	app.get('/clonebook/data/user', auth, UserController.getUsers);

	//GET user by ID
	//returns one user wih given id
	app.get('/clonebook/data/user/:id', auth, UserController.getUser);

	//GET all posts of one user
	//returns all posts of given user
	app.get('/clonebook/data/user/:id/posts', auth, UserController.getPosts);

	//GET all friends for user
	//returns all friends of given user
	app.get('/clonebook/data/user/:id/friends', auth, UserController.getFriends);

	//POST new user
	//creates a new user from given request.body object
	app.post('/clonebook/data/user', UserController.create);

	//PUT a new image
	//add an profile avatar for given user
	app.put('/clonebook/data/user/img/:id', auth, multer.single("image"), UserController.addImage);

	//PUT user
	//updates a given user
	app.put('/clonebook/data/user/:id', auth, UserController.update);

	//DELETE user
	//deletes a given user
	app.delete('/clonebook/data/user/:id', auth, UserController.remove);
}
