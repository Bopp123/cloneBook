const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const Name = require('./name');
const Address = require('./address');
const Contact = require('./contact');
const secret = require('../config/secrets.json');



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
        text:true,
		required: [true, 'Name is required.']
	},
	age: Number,
	birthday: Number,
	address: {
        type: [Address],
	},
	contact: {
		type: Contact,
		required: [true, 'Contact is required.']
	},
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'post'
	}],
	avatar: String,
	followingPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'post'
	}]
});
UserSchema.index({'$**': 'text'});


UserSchema.virtual('postCount').get(function () {
	return this.posts.length;
});

UserSchema.pre('remove', function (next) {
	const Post = mongoose.model('post');
	const Friendship = mongoose.model('friendship');
	Promise.all([
        Friendship.remove({
            '$or': [{
                'userOne': this._id
            }, {
                'userTwo': this._id
            }]
        }),
	Post.remove({_id: {$in: this.posts}}) 
	])
	.then(() => {	
		next();
	});
});

UserSchema.methods.generateHash = function (password) {
	const hash = crypto.createHmac('sha256', password)
       .update(secret.salt)
       .digest('hex');
        	
	return hash;

}


UserSchema.methods.generateJwt = function () {
	var expiry = new Date();
	//JWT valid for 30 minutes
	expiry.setTime(expiry.getTime() + (30*60000));

	return jwt.sign({
	    _id: this._id,
	    username: this.username,
	    exp: parseInt(expiry.getTime() / 1000),
	  }, secret.token); // DO NOT KEEP YOUR SECRET IN THE CODE!
}

UserSchema.pre('save', function (next) {
	if(this.isNew) {
        this.password = this.generateHash(this.password);
	}
	next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
