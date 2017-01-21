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
                res.status(200).json(friends);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } else {
        res.status(400).send("error: requester cant be friends with him self");
    }
}

const updateStatus = (req, res) => {
    Friendship.findById(req.params.id)
        .then((friendship) => {
            if (req.body.approved) {
                friendship.status = "APPROVED";
                friendship.save()
                    .then(() => {
                        User.find({_id: {$in: [friendship.userTwo, friendship.userOne]}})
                            .then((data) => {
                                console.log(data);
                                let user1 = data[0];
                                let user2 = data[1];
                                if (!user1.friends.includes(user2)) {
                                    user1.friends.push(user2._id);
                                }
                                if (!user2.friends.includes(user1)) {
                                    user2.friends.push(user1._id);
                                }

                                Promise.all([user1.save(), user2.save()])
                                    .then(() => {
                                        res.json('OK');
                                    })
                                    .catch((err) => {
                                        res.status(409).json(err);
                                    });
                            });
                    });
            } else {
                friendship.declineFriendship()
                    .then(() => {
                        res.status(200).json("declined");
                    });
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