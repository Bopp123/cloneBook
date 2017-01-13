const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LikesSchema = new Schema({
	liker: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = LikesSchema;