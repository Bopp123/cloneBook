const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const Name = require('./name');
const Address = require('./address');
const Contact = require('./contact');
let salt = 'WENEEDMORESALT';


const UserSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required and has to be unique.'],
		index: {unique: true}
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	name: {
		type: Name,
		required: [true, 'Name is required.']
	},
	age: Number,
	address: [Address],
	contact: {
		type: Contact,
		required: [true, 'Contact is required.']
	},
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'post'
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

UserSchema.methods.generateHash = function (secret) {
	const hash = crypto.createHmac('sha256', secret)
       .update(salt)
       .digest('hex')
        	
	return hash;

}


UserSchema.methods.generateJwt = function () {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() +7);

	return jwt.sign({
	    _id: this._id,
	    username: this.username,
	    exp: parseInt(expiry.getTime() / 1000),
	  }, salt); // DO NOT KEEP YOUR SECRET IN THE CODE!
}

UserSchema.pre('save', function (next) {
	if(this.isNew) {
        this.password = this.generateHash(this.password);
	}
	next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
