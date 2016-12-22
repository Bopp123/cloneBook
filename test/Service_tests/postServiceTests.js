const assert = require('assert');
const User = require('../../model/user');
const Post = require('../../model/post');
const request = require('supertest');
const app = require('../../app');

describe('Testing Service methods for post', () => {	
	let user, post1,post2,post3;
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
		user.posts.push(post1,post2,post3);
		post1.followers.push(user);
		post2.followers.push(user);
		post3.followers.push(user);
	
		Promise.all([user.save(),post1.save(),post2.save(), post3.save()])
		.then(() => {			
			request(app)
				.post('/data/login')
				.send({username: 'joe', password: 'test123'})
				.end((err,res) => {	
					token = JSON.parse(res.text).token;
					done();
				})
		});	
	});

	it('GET /data/posts gets a list of posts for requesting user ', (done) => {	
		request(app)
			.get('/data/post')
			.set('Authorization', 'Bearer ' + token)
			.send(user)
			.end((err,response) => {	
				assert(response.body.length === 3);
				done();
			});
	});

	it('POST /data/post creates a new post', (done) => {	
		request(app)
			.post(`/data/post`)
			.set('Authorization', 'Bearer ' + token)
			.send({
				title: 'posttest',
				content: 'test content 2',
				mediaType: 'IMG',
				media: 'http://placekitten.com/200/300'
			})
			.end((err,response) => {
				assert(response.body.title === 'posttest');
				done();
			});
	});

	it('PUT /data/post/:id a new title to an existing post', (done) => {	
		let updatedPost = post1;
		updatedPost.title = 'updated title';
		request(app)
			.put(`/data/post/${post1._id}`)
			.set('Authorization', 'Bearer ' + token)
			.send(updatedPost)
			.expect(200)
			.end((err,response) => {
				assert(response.status === 200);
				Post.findById(post1._id)
					.then((post) => {	
						assert(post.title = 'updated title');
						done();
					});
			});
	});

	it('DELETE /data/post:id a existing post from DB', (done) => {	
		request(app)
			.delete(`/data/post/${post1._id}`)
			.set('Authorization', 'Bearer ' + token)
			.end((err,response) => {
				User.findById(post1._id)
					.then((post) => {	
						assert(post=== null);
						done();
					});
			});
	});

	it('PUT /data/post/:id/like puts a like to an existing post and checks if this post is now followed b the requester', (done) => {	
		request(app)
			.put(`/data/post/${post1._id}/like`)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.end((err,res) => {	
				Post.findById(post1._id)
				 .then((post) => {	
				 	assert(post.likesCount === 1);
				 });
			});
		request(app)
			.put(`/data/post/${post1._id}/like`)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.end((err,res) => {	
				Post.findById(post1._id)
				 .then((post) => {	
				 	assert(post.likesCount === 1);
				 	assert(post.followers.length === 1);
				 	done();
				 });
			});
	});
});