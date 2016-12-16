const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only'
  })
];

const NameSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'Firstname is required.'],
		validate: nameValidator
	},
	middleNames: [{
		type: String,
		validate: nameValidator
	}],
	lastName: {
		type: String,
		required: [true, 'Lastname is required.'],
		validate: nameValidator
	}
});

module.exports = NameSchema;