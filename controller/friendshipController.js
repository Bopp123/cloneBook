const Friendship = require("../model/friendship");
const User = require("../model/user");


const create = (req, res) => {
	let requester = req.user._id;
	if (requester.toString() !== req.body.id.toString()) {
		// statement


		let friendshipRequest = new Friendship({
			userOne: requester,
			userTwo: req.body.id
		});
		friendshipRequest.save()
			.then((friends) => {
				res.status(200).json(friends)
			})
			.catch((error) => {
				res.status(500).json(error)
			});
	} else {
		res.status(400).send("error: requester cant be friends with him self");
	}
}

const updateStatus = (req, res) => {
	Friendship.findById(req.params.id)
		.then((friendship) => {
			if (req.body.approved) {
				friendship.approveFriendship()
					.then((friendsNow) => {
						res.status(200).json(friendsNow);
					});
			} else if (req.body.declined) {
				friendship.declineFriendship()
					.then((notFriends) => {
						res.status(200).json(notFriends);
					});
			} else {
				res.status(400).send("BAD REQUEST");
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		})
}


module.exports = {
	updateStatus,
	create
}