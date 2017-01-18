const Post = require('../model/post');
const Comment = require('../model/comment');
const User = require('../model/user');


const create = (req, res) => {
    let comment = new Comment({
        content: req.body.content,
        author: req.user._id
    });
    comment.save()
        .then((commentFound) => {
            Post.findByIdAndUpdate(req.params.postId, {
                $addToSet: {
                    "comments": commentFound._id
                },
                $set: {
                    "updated": Date.now()
                }
            }, {
                new: true
            })
                .populate({
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'author',
                        model: 'user',
                        select: 'name +_id +avatar'
                    }
                })
                .then((post) => {
                    res.status(200).json(post.comments)
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}

const update = (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
        .then((post) => {
            if (post) {
                res.send('OK')
            } else {
                res.status(404).send('comment not found');
            }
        })
        .catch((error) => {
            res.json(error);
        });
}

const remove = (req, res) => {
    Comment.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send('OK')
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}

const addLike = (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            "likes": req.user_id
        }
    })
        .then(() => {
            Post.findOne({
                comments: req.params.id
            })
                .then((post) => {
                    User.findByIdAndUpdate(req.user._id, {
                        $addToSet: {
                            "followingPosts": post._id
                        }
                    })
                        .then(() => {
                            res.send("OK");
                        });
                });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}

module.exports = {
    create,
    update,
    remove,
    addLike
};