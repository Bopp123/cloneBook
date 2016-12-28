const Post = require("../model/post");
const User = require("../model/user");
const aws = require('./helper/awsS3');

const savePost = (userId, post,res) => {	
	Promise.all([User.findByIdAndUpdate(userId,{$push: {"posts": post._id}}), post.save()])
		.then(() => {
			res.json(post);
		})
		.catch((error) => {
			res.json(error);
		});	
}

const create = (req, res) => {
	
	const post = new Post(req.body);
	post.followers.push(req.user._id);
	if (req.file) {
		//bucketName, file, contentType, title
		aws.uploadS3('clonebookposts', req.file.buffer, req.file.mimetype, post._id.toString())
		.then((data) => {
			post.media = data.Location;
			post.mediaType = req.file.mimetype;	
			savePost(req.user._id, post,res);
		})
		.catch((err) => {	
			res.status(500).json(err);
		})

	} else {
		savePost(req.user._id, post,res);
	}
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
		.then((data) => {
			if(data.media !== ''){
			aws.deleteS3('clonebookposts', data._id.toString())
			.then((data) => {
						res.send('OK');
					})
					.catch((err) => {
						res.status(404).json('could not find post media');
					})
			} else {
				res.send('OK');
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
}

const addLike = (req, res) => {
	Post.findByIdAndUpdate(req.params.id, {
			$addToSet: {
				"likes": req.user._id,
				"followers": req.user._id
			}
		})
		.then(() => {
			res.send("OK");
		})
		.catch((error) => {
			res.json(error);
		});
}

const getPostsForUser = (req, res) => {	
	Post.find({
			"followers": req.user._id
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