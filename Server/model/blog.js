

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema =  new Schema({
	title: String,
	content: String,
	media: String,
	likes: Number
});

module.exports = PostSchema;