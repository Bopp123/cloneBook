module.exports = (app, auth) => {	



	//POST new comment
	//creates a new comment for given post
	app.post('/data/comment/:postID',auth, (req,res) => {	
		//TODO
	});

	//PUT comment 
	//updates a given comment
	app.put('/data/comment/:id', auth, (req,res) => {	
		//TODO
	});

	//PUT comment LIKE
	//updates a given comment and adds a like to given comment
	app.put('/data/comment/:id/like', auth, (req,res) => {	
		//TODO
	});

	//DELETE comment
	//deletes a given comment 
	app.delete('/data/comment/:id', auth, (req,res) => {	
		//TODO
	})
}