module.exports = (app) => {	

	//GET all posts the given user follows
	//returns a list of posts the user is following sorted by freshness
	app.get('/data/post/:userID', (req,res) => {	
		//TODO
		res.send({test: 'test'});
	});

	//POST new post
	//creates a new post from given request.body object
	app.post('/data/post', (req,res) => {	
		//TODO
	});

	//PUT post
	//updates a given post
	app.put('/data/post/:id', (req,res) => {	
		//TODO
	});

	//PUT a like for given posts
	//updates given post and adds one like
	app.put('/data/post/:id/like', (req,res) => {	
		//TODO
	});

	//DELETE post
	//deletes a given user
	app.delete('/data/post/:id', (req,res) => {	
		//TODO
	});
}