module.exports = (app, auth) => {	



	//POST new friendship
	//creates a new friendship between two users 
	//from given request.body object
	app.post('/data/friendship', auth, (req,res) => {	
		//TODO
	});

	//PUT friendship 
	//updates a given post
	app.put('/data/friendship/:id', auth, (req,res) => {	
		//TODO
	});
}