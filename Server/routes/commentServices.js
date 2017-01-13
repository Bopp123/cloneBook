const CommentController = require("../controller/commentController");

module.exports = (app, auth) => {	



	//POST new comment
	//creates a new comment for given post
	app.post('/data/comment/:postId',auth, CommentController.create);

	//PUT comment 
	//updates a given comment
	app.put('/data/comment/:id', auth, CommentController.update);

	//PUT comment LIKE
	//updates a given comment and adds a like to given comment
	app.put('/data/comment/:id/like', auth, CommentController.addLike);

	//DELETE comment
	//deletes a given comment 
	app.delete('/data/comment/:id', auth, CommentController.remove);
}