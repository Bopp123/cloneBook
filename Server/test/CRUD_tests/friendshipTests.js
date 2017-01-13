const assert = require('assert');
const Friendship = require('../../model/friendship');
const User = require('../../model/user');

describe('Testing CRUD operations for friendship model', () => {	
	let friendship, user, user2;
	beforeEach((done) => {	
		user = new User({
			name: {
				firstName: 'Joe',
				lastName: 'Kunz'
			},
			age: '27',
			password: 'test123',
			username: 'joe',
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
				firstName: 'Alex',
				lastName: 'Rosin'
			},
			age: '25',
			username: 'alex',
			password: 'test123',
			address: {
				zip: '12345',
				city: 'Hamburg',
				street: 'Sternschanze',
				streetNumber: 333,
				country: 'Deutschland'
			},
			contact: {
				email: 'test1234@gmail.com',
				phone: 012345678
			}
		});
		Promise.all([user.save(), user2.save()])
			.then(() => {	
				friendship = new Friendship({
					userOne: user,
					userTwo: user2
				});
				friendship.save()
					.then(() => {	
						done();
					});
			});
	});

	it('saves a friendship', () => {	
		assert(!friendship.isNew);
	});

	it('reads a friendship from DB', (done) => {	
		Friendship.findById(friendship._id)
			.then((data) => {	
				assert(data.userOne.toString() === user._id.toString());
				done();
			})
			.catch((error) => {	
				console.log(error);
			});
	});

	it('updates a friendship by accepting a friendship', (done) => {	
		friendship.approveFriendship();
		friendship.save()
		.then(() => {	
			Friendship.findById(friendship._id)
			.then((data) => {
				assert(data.status === 'APPROVED');
				done();
			});
		})
		.catch((error) => {	
				console.log(error);
			});
	});

	it('removes a friendship from DB by declining a friendship', (done) => {	
		Friendship.findById(friendship._id)
			.then((data) => {	
				data.declineFriendship()
			})
			.then((data) => {	
				return Friendship.findById(friendship._id);
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