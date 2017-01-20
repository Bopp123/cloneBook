const User = require('../model/user');
const Friendship = require('../model/friendship');
const aws = require('./helper/awsS3');

const postPopQuery = [{
    path: 'comments',
    model: 'comment',
    populate: {
        path: 'author',
        model: 'user',
        select: 'username +_id + avatar'
    }
},
    {
    path: 'author',
    model: 'user',
    select: 'username +_id + avatar'
}];


const create = (req, res) => {
    User.create(req.body)
        .then((user) => {
            user.password = "youdontneedtoknow";
            res.json(user);
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.status(406, "username, phonenumber or email are already taken");
            }
            res.status(500).json(error);
        });
}

const getUsers = (req, res) => {
    User.find(req.query)
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            res.json(error);
        });
}

const getUser = (req, res) => {
    if (!req.query.includePosts) {
        User.findById(req.params.id)
            .then((user) => {
                res.json(user);
            })
            .catch((error) => {
                res.status(404);
                res.json(error);
            });
    } else {
        User.findById(req.params.id)
            .populate({
                path: 'posts',
                model: 'post',
                populate: postPopQuery
            })
            .then((user) => {
                res.json(user);
            })
            .catch((error) => {
                res.status(404);
                res.json(error);
            });
    }
}

const getPosts = (req, res) => {
    User.findById(req.params.id)
        .populate({
            path: 'posts',
            model: 'post',
            populate: postPopQuery
        })
        .populate({
            path: 'followingPosts',
            model: 'post',
            populate: postPopQuery
        })
        .then((user) => {
            let posts = user.followingPosts.concat(user.posts);
            posts.sort((a, b) => {
                return b.updated > a.updated;
            });
            res.json(posts);
        })
        .catch((error) => {
            res.json(error);
        });
}

const getFriends = (req, res) => {
    Friendship.find({
        '$or': [{
            'userOne': req.params.id
        }, {
            'userTwo': req.params.id
        }]
    })
        .sort({
            _id: -1
        })
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        })
}

const update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((user) => {
            if (user) {
                res.send('OK');
            } else {
                res.status(404);
            }
        })
        .catch((error) => {
            res.json(error);
        });
}

const remove = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((data) => {
            if (data.avatar !== '') {
                aws.deleteS3('clonebookuser', data._id.toString())
                    .then((data) => {
                        res.send('OK');
                    })
                    .catch((err) => {
                        res.status(404).json('could not find users image');
                    })
            } else {
                res.send('OK');
            }
        })
        .catch((error) => {
            res.json(error);
        });
}

const addImage = (req, res) => {
    //bucketName, file, contentType, title
    aws.uploadS3('clonebookuser', req.file.buffer, req.file.mimetype, req.params.id)
        .then((data) => {
            User.findByIdAndUpdate(req.params.id, {
                'avatar': data.Location
            })
                .then((user) => {
                    if (user) {
                        res.send('OK');
                    } else {
                        res.status(404);
                    }
                })
                .catch((error) => {
                    res.json(error);
                });
        });
}


module.exports = {
    create,
    remove,
    update,
    getUser,
    getUsers,
    getPosts,
    getFriends,
    addImage
}