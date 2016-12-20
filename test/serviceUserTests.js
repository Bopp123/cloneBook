const assert = require('assert');
const User = require('../model/user');
const request = require('supertest');

describe('Testing Service methods for user', () => {	
	let user , user2, user3;
	beforeEach((done) => {	
		user = new User({
			name: {
				firstName: 'Joe',
				lastName: 'Kunz'
			},
			username: 'joe',
			password: 'test123',
			age: '27',
			address: {
				zip: '12053',
				city: 'Berlin',
				street: 'Herrmannstrasse',
				streetNumber: 222,
				country: 'Deutschland'
			},
			contact: {
				email: 'test123@gmx.de',
				phone: 01234567
			}
		});
		user2 = new User({
			name: {
				firstName: 'Konstantin',
				lastName: 'Schall'
			},
			username: 'konsi',
			password: 'test123',
			age: '27',
			address: {
				zip: '12053',
				city: 'Berlin',
				street: 'Herrmannstrasse',
				streetNumber: 222,
				country: 'Deutschland'
			},
			contact: {
				email: 'test@gmx.de',
				phone: 012345
			}
		});
		user3 = new User({
			name: {
				firstName: 'Alex',
				lastName: 'Rosin'
			},
			username: 'alex',
			password: 'test123',
			age: '27',
			address: {
				zip: '12053',
				city: 'Berlin',
				street: 'Herrmannstrasse',
				streetNumber: 222,
				country: 'Deutschland'
			},
			contact: {
				email: 'test1234@gmx.de',
				phone: 012345678
			}
		});
		Promise.all([user.save(),user2.save(),user3.save()])
		.then(() => {	
			done();
		});	
	});

	it('saves a user', () => {	
		assert(!user.isNew);
	});

	it('reads a user from DB and tests passwordHashing', (done) => {	
		User.findById(user._id)
			.select('+password')
			.then((data) => {	
				assert(data.name.firstName === 'Joe');
				assert(data.password === data.generateHash('test123'));
				done();
			})
			.catch((error) => {	
				console.log(error);
			});
	});

	it('updates a user', (done) => {	
		user.name.firstName = 'Alex';
		user.save()
		.then(() => {	
			User.findById(user._id)
			.then((data) => {	
				assert(data.name.firstName === 'Alex');
				done();
			})
		})
		.catch((error) => {	
				console.log(error);
			});
	});

	it('removes a user from DB', (done) => {	
		user.remove()
			.then(() => {	
				return User.findById(user._id);
			})
			.then((data) => {	
				assert(data === null);
				done();
			})
			.catch((err) => {	
				console.log(err)
			});
	});
});