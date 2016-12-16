const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

const zipValidator = 
  validate({
    validator: 'isLength',
    arguments: [4, 10],
    message: 'Zipcode should be between {ARGS[0]} and {ARGS[1]} characters'
  });

const cityValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'City should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'City should contain alpha-numeric characters only'
  })
];

const streetValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 100],
    message: 'Street should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'Street should contain alpha-numeric characters only'
  })
];

const countryValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'Country should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'Country should contain alpha-numeric characters only'
  })
];

const AddressSchema = new Schema({
	zip: {
		type: String,
		required: [true, 'Zipcode is required.'],
		validate: zipValidator
	},
	street: {
		type: String,
		required: [true, 'Street is required.'],
		validate: streetValidator
	},
	streetNumber: {
		type: String,
		required: [true, 'Street number is required.']
	},
	country: {
		type: String,
		required: [true, 'Country is required.'],
		validate: countryValidator
	}
});

module.exports = AddressSchema;