const Post = require("../model/post");
const User = require("../model/user");

const create = (req, res) => {
	//TODO: requester will be implemted when authentication is done
	User.findById(req.user._id)
		.then((requester) => {
			const post = new Post(req.body);
			post.followers.push(requester);
			requester.posts.push(post);
			Promise.all([requester.save(), post.save()])
				.then(() => {
					res.json(post);
				})
				.catch((error) => {
					res.json(error);
				});
		});
}

const update = (req, res) => {
	Post.findByIdAndUpdate(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.send('OK')
			} else {
				res.status(404);
			}
		})
		.catch((error) => {
			res.json(error);
		});
}

const remove = (req, res) => {
	Post.findByIdAndRemove(req.params.id)
		.then(() => {
			res.send('OK')
		})
		.catch((error) => {
			res.json(error);
		});
}

const addLike = (req, res) => {
	User.findById(req.user._id)
		.then((requester) => {
			Post.findByIdAndUpdate(req.params.id, {
					$addToSet: {
						"likes": requester,
						"followers": requester
					}
				})
				.then(() => {
					res.send("OK");
				})
				.catch((error) => {
					res.json(error);
				});
		});
}

const getPostsForUser = (req, res) => {	
	requester = req.user._id;
	Post.find({
			"followers": requester
		})
		.sort({
			updated: -1
		})
		.then((posts) => {
			res.json(posts);
		})
		.catch((error) => {
			res.status(500);
			res.json(error);
		});

}

module.exports = {
	getPostsForUser,
	addLike,
	create,
	update,
	remove
}