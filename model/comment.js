const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LikesSchema = require('./likes');
const validate = require('mongoose-validator');

const contentValidator = 
  validate({
    validator: 'isLength',
    arguments: [2, 5000],
    message: 'Content should be between {ARGS[0]} and {ARGS[1]} characters'
  });


const CommentSchema = new Schema({
	content: {
		type: String,
		required: [true,'Content is required'],
		validate: contentValidator
	},
	author: {
		type: Schema.Types.ObjectId,
		required: [true,'Author is required'],
		ref: 'user'
	},
	likes: [LikesSchema]
});


const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;