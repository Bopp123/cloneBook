const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LikesSchema = require('./likes');
const validate = require('mongoose-validator');

const titleValidator = 
  validate({
    validator: 'isLength',
    arguments: [2, 180],
    message: 'Title should be between {ARGS[0]} and {ARGS[1]} characters'
  });

  const contentValidator = 
  validate({
    validator: 'isLength',
    arguments: [2, 5000],
    message: 'Content should be between {ARGS[0]} and {ARGS[1]} characters'
  });

const PostSchema = new Schema({
	title: {
		type: String,
		validate: titleValidator
	},
	content: {
		type: String,
		validate: contentValidator
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}],
	mediaType: {
		type: String
	},
	media: String,
	likes: [LikesSchema],
	followers: [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	updated: { type: Date }
});

PostSchema.virtual('created').get( function () {
  return this._id.getTimestamp();
});

PostSchema.pre('save', function(next){
  this.updated = Date.now();
  next();
});

PostSchema.virtual('likesCount').get(function () {
	return this.likes.length;
});

PostSchema.methods.setMedia = function (url, type) {
	this.media = url;
	this.mediaType = type;
}

const Post = mongoose.model('post', PostSchema);
module.exports = Post;