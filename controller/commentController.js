const Post = require('../model/post');
const Comment = require('../model/comment');


const create = (res,req) => {
	let comment = new Comment({
		content: req.body.content,
		author: requester
	});
	comment.save()
		.then((commentFound) => {	
			return Post.findByIdAndUpdate(req.params.postID, {$push: {posts : commentFound}})
					.populate({
						path: 'blogs',
						populate: {
							path: 'comments',
							model: 'comment',
							populate: {
								path: 'author',
								model: 'user'
							}
						}
					});
		})	
		.then((post) => {	
			res.status(200).json(post)
		})
		.catch((error) => {	
			res.status(500).json(error);
		});
}

const update = (req,res) => {	
	
}