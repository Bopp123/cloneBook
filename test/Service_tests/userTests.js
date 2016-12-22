const assert = require('assert');
const User = require('../../model/user');
const Post = require('../../model/post');
const Friendship = require('../../model/friendship');
const request = require('supertest');
const app = require('../../app');

describe('Testing Service methods for user', () => {	
	let user , user2, user3, post1,post2,post3,friendship,friendship2, friendship3, token;
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
			request(app)
				.post('/data/login')
				.send({username: 'alex', password: 'test123'})
				.end((err,res) => {	
					token = JSON.parse(res.text).token;
					done();
				})
		});	
	});

	it('gets a list of users with given criteria via GET data/user', (done) => {	
		request(app)
			.get('/data/user')
			.set('Authorization', 'Bearer ' + token)
			.end((err,response) => {	
				assert(response.body.length === 3);
			});
		request(app)
			.get('/data/user?name.firstName=Joe')
			.set('Authorization', 'Bearer ' + token)
			.end((err,response) => {	
				assert(response.body[0].username === user.username);
			});
		request(app)
			.get('/data/user?address.city=Berlin')
			.set('Authorization', 'Bearer ' + token)
			.end((err,response) => {	
				assert(response.body.length === 3);
				done();
			});
	});

	it('GET one user via data/user/:id', (done) => {	
		request(app)
			.get(`/data/user/${user._id}`)
			.set('Authorization', 'Bearer ' + token)
			.end((err,response) => {
				assert(response.body.username === user.username);
				done();
			});
	});

	it('POST one user via data/user/', (done) => {	
		request(app)
			.post(`/data/user`)
			.send({
				name: {
				firstName: 'test',
				lastName: 'test'
			},
			username: 'testuser',
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
				email: 'test444@gmx.de',
				phone: 012345444
			}
			})
			.end((err,response) => {
				assert(response.status === 200);
				User.findOne({username: 'testuser'})
					.then((user) => {	
						assert(user.name.firstName = 'test');
						done();
					});
			});
	});

	it('PUTs a new username for user via /data/user/:id', (done) => {	
		let updatedUser = user;
		updatedUser.username = 'newUserName';
		request(app)
			.put(`/data/user/${user._id}`)
			.set('Authorization', 'Bearer ' + token)
			.send(updatedUser)
			.expect(200)
			.end((err,response) => {
				assert(response.status === 200);
				User.findById(user._id)
					.then((user) => {	
						assert(user.userName = 'newUserName');
						done();
					});
			});
	});

	it('removes a user from DB via DELETE /data/user/:id', (done) => {	
		request(app)
			.delete(`/data/user/${user._id}`)
			.set('Authorization', 'Bearer ' + token)
			.end((err,response) => {
				User.findById(user._id)
					.then((user) => {	
						assert(user === null);
						done();
					});
			});
	});

	it('GET all posts, an user with given id has posted', (done) => {	

		post1 = new Post({
			title: 'test title',
			content: 'test content 123',
			mediaType: 'IMG',
			media: 'http://placekitten.com/200/300'
		});
		post2 = new Post({
			title: 'test title2',
			content: 'test content 2',
			mediaType: 'IMG',
			media: 'http://placekitten.com/200/300'
		});
		post3 = new Post({
			title: 'test title3',
			content: 'test content 3',
			mediaType: 'IMG',
			media: 'http://placekitten.com/200/300'
		});
		Promise.all([post1.save(),post2.save(),post3.save()])
			.then(() => {	
				user.update({$pushAll: {'posts' : [post1,post2,post3]}})
				.then(() => {	
					request(app)
					.get(`/data/user/${user._id}/posts`)
					.set('Authorization', 'Bearer ' + token)
					.end((err,response) => {
					assert(response.body.length === 3);
					assert(response.body[0].title === 'test title');
					done();
					});
				});
			});
	});	

	it('GET all friendships, an user with given id has', (done) => {	
		friendship = new Friendship({
					userOne: user,
					userTwo: user2
				});
		friendship2 = new Friendship({
					userOne: user3,
					userTwo: user
				});
		friendship3 = new Friendship({
					userOne: user2,
					userTwo: user3
				});
		Promise.all([friendship.save(),friendship2.save(),friendship3.save()])
		.then(() => {	
			request(app)
			.get(`/data/user/${user._id}/friends`)
			.set('Authorization', 'Bearer ' + token)
			.end((err,response) => {
			assert(response.body.length === 2);
			done();
			});
		})
	});	
});