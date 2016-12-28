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
	return this.save();
};

FriendshipSchema.methods.declineFriendship = function () {
	return this.remove();
};

module.exports = mongoose.model('friendship', FriendshipSchema);