const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
	userOne: {
		type: Schema.Types.ObjectId,
		required: [true, 'Requester required.'],
		ref: 'user'
	},
	userTwo: {
		type: Schema.Types.ObjectId,
		required: [true, 'Target friend is required.'],
		ref: 'user'
	},
	status: {
		type: String,
		enum: ['PENDING','APPROVED'],

		default: 'PENDING'
	}
});

FriendshipSchema.methods.approveFriendship = function () {
	this.status = 'APPROVED'
	return this.update();
};

FriendshipSchema.methods.declineFriendship = function () {
	return this.remove();
};

FriendshipSchema.methods.getFriend = function (requester){
	if(requester.toString() == this.userOne.toString()) return this.userTwo;
	return this.userOne;
};

module.exports = mongoose.model('friendship', FriendshipSchema);