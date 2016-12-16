const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Name = require('./name');
const Address = require('./address');
const Contact = require('./contact');


const UserSchema = new Schema({
	username: {
		type: String,
		index: {unique: true}
	},
	name: Name,
	age: Number,
	address: [Address],
	contact: Contact,
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'post'
	}],
	friendships: [{
		type: Schema.Types.ObjectId,
		ref: 'friendship'
	}]
});

UserSchema.virtual('postCount').get(function () {
	return this.posts.length;
});
UserSchema.virtual('friendshipCount').get(function () {
	return this.friendships.length;
});

UserSchema.pre('remove', function (next) {
	const Post = mongoose.model('post');
	const Friendship = mongoose.model('friendship');
	Promise.all([
	Friendship.remove({_id: {$in: this.friendships}}),
	Post.remove({_id: {$in: this.posts}}) 
	])
	.then(() => {	
		next();
	});
});


const User = mongoose.model('user', UserSchema);

module.exports = User;
