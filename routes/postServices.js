const PostController = require("../controller/postController");

module.exports = (app, auth) => {	

	//GET all posts the given user follows
	//returns a list of posts the user is following sorted by freshness
	app.get('/data/post', auth, PostController.getPostsForUser);

	//POST new post
	//creates a new post from given request.body object
	app.post('/data/post', auth, PostController.create);

	//PUT post
	//updates a given post
	app.put('/data/post/:id', auth, PostController.update);

	//PUT a like for given posts
	//updates given post and adds one like
	app.put('/data/post/:id/like', auth, PostController.addLike);

	//DELETE post
	//deletes a given user
	app.delete('/data/post/:id', auth, PostController.remove);
}