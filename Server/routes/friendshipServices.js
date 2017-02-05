const FriendshipController = require('../controller/friendshipController');

module.exports = (app, auth) => {	



	//POST new friendship
	//creates a new friendship between two users 
	//from given request.body object
	app.post('/clonebook/data/friendship', auth, FriendshipController.create);

	//PUT friendship 
	//updates a given post
	app.put('/clonebook/data/friendship/:id', auth, FriendshipController.updateStatus);
}