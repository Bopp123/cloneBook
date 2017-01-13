const assert = require('assert');
const User = require('../../model/user');
const Friendship = require('../../model/friendship');
const request = require('supertest');
const app = require('../../../app');

describe('Testing Service methods for friendship', () => {	
	let user , user2, user3, post1,post2,post3,friendship,token;
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
		friendship = new Friendship({
					userOne: user,
					userTwo: user2
				});
		Promise.all([user.save(),user2.save(),user3.save(),friendship.save()])
		.then(() => {			
			request(app)
				.post('/data/login')
				.send({username: 'alex', password: 'test123'})
				.end((err,res) => {	
					token = JSON.parse(res.text).token;
					done();
				})
		});	
	});

	it('POST /data/friendship creates a new friends request', (done) => {	
		request(app)
			.post('/data/friendship')
			.set('Authorization', 'Bearer ' + token)
			.send({id: user._id})
			.end((err,response) => {
				assert(response.body.status === 'PENDING');
				assert(response.body.userOne.toString() === user3._id.toString());
				assert(response.body.userTwo.toString() === user._id.toString());
			});
		request(app)
			.post('/data/friendship')
			.set('Authorization', 'Bearer ' + token)
			.send({id: user3._id})
			.end((err,response) => {
				assert(response.status === 400);
				assert(response.text.includes("error"));
				done();
			});
	});

	it('PUT /data/friendship/:id updates the status of a friendship (declining and accepting)', (done) => {	
		request(app)
			.put(`/data/friendship/${friendship._id}`)
			.set('Authorization', 'Bearer ' + token)
			.send({approved: true})
			.end((err,response) => {
				Friendship.findById(friendship._id)
					.then((friends) => {	
						assert(friends.status === 'APPROVED');
						request(app)
							.put(`/data/friendship/${friendship._id}`)
							.set('Authorization', 'Bearer ' + token)
							.send({declined: true})
							.end((err,response) => {
								Friendship.findById(friendship._id)
									.then((friends) => {	
										assert(friends === null);
										done();
									})
							});
					})
			});
	});
});