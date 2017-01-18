const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

const contentValidator =
    validate({
        validator: 'isLength',
        arguments: [1, 5000],
        message: 'Content should be between {ARGS[0]} and {ARGS[1]} characters'
    });


const CommentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content is required'],
        validate: contentValidator
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'Author is required'],
        ref: 'user'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

CommentSchema.virtual('likesCount').get(function () {
    return this.likes.length;
});

CommentSchema.virtual('created').get( function () {
    return this._id.getTimestamp();
});


const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;