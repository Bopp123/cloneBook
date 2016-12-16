const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 80],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isEmail',
    passIfEmpty: false,
    message: 'Email should be a valid email address'
  })
];

const phoneValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 80],
    message: 'Phone number should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isNumeric',
    passIfEmpty: false,
    message: 'Phone number shiuld contain numers only'
  })
];

const ContactSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required.'],
		index: {unique: true},
		validate: emailValidator
	},
	phone: {
		type: String,
		required: [true, 'Lastname is required.'],
		index: {unique: true},
		validate: phoneValidator
	}
});

module.exports = ContactSchema;