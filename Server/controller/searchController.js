const Post = require("../model/post");
const User = require("../model/user");


const search = function (req, res) {
    console.log(req.query);
    Promise.all([
        Post.find({$text :{$search :req.query.string}},{ score : { $meta: "textScore" } }),
        User.find({$text :{$search :req.query.string}},{ score : { $meta: "textScore" } })
        ])
        .then((data) => {
           const result =  data[1].concat(data[0]);
           result.sort((a,b) => {
                return a.score>b.score;
           })
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}

module.exports = {
    search
}