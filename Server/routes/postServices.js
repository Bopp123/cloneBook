const PostController = require("../controller/postController");
const multer = require("multer")();

module.exports = (app, auth) => {	

	// //GET all posts the given user follows
	// //returns a list of posts the user is following sorted by freshness
	// app.get('/data/post', auth, PostController.getPostsForUser);

	//POST new post
	//creates a new post from given request.body object
	app.post('/clonebook/data/post', auth, multer.single('media'), PostController.create);

	//PUT post
	//updates a given post
	app.put('/clonebook/data/post/:id', auth, PostController.update);

	//PUT a like for given posts
	//updates given post and adds one like
	app.put('/clonebook/data/post/:id/like', auth, PostController.addLike);

	//DELETE post
	//deletes a given user
	app.delete('/clonebook/data/post/:id', auth, PostController.remove);
}