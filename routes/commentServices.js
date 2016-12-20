module.exports = (app) => {	



	//POST new comment
	//creates a new comment for given post
	app.post('/data/comment/:postID', (req,res) => {	
		//TODO
	});

	//PUT comment 
	//updates a given comment
	app.put('/data/comment/:id', (req,res) => {	
		//TODO
	});

	//PUT comment LIKE
	//updates a given comment and adds a like to given comment
	app.put('/data/comment/:id/like', (req,res) => {	
		//TODO
	});

	//DELETE comment
	//deletes a given comment 
	app.delete('/data/comment/:id', (req,res) => {	
		//TODO
	})
}