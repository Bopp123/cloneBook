const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
	userOne: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	userTwo: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	status: {
		type: String,
		enum: ['PENDING','APPROVED'],
		default: 'PENDING'
	}
});

FriendshipSchema.methods.approveFriendship = function () {
	return this.status = 'APPROVED'
};

FriendshipSchema.methods.declineFriendship = function () {
	return this.remove();
};

module.exports = mongoose.model('friendship', FriendshipSchema);