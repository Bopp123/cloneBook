const assert = require('assert');
const User = require('../model/user');

describe('Testing CRUD operations for user model', () => {	
	let user;
	beforeEach((done) => {	
		user = new User({
			name: {
				firstName: 'Joe',
				lastName: 'Kunz'
			},
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
		user.save()
		.then(() => {	
			done();
		});	
	});

	it('saves a user', () => {	
		assert(!user.isNew);
	});

	it('reads a user from DB', (done) => {	
		User.findById(user._id)
			.then((data) => {	
				assert(data.name.firstName === 'Joe');
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