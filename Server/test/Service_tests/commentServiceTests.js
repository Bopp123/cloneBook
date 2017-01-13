const assert = require('assert');
const User = require('../../model/user');
const Post = require('../../model/post');
const request = require('supertest');
const app = require('../../../app');
const Comment = require('../../model/comment');

describe('Testing Service methods for comment', () => {	
	let user,user2, post1, comment1;
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
		post1 = new Post({
			title: 'test title',
			content: 'test content 123',
			mediaType: 'IMG',
			media: 'http://placekitten.com/200/300'
		});

		comment = new Comment({
			content: 'test',
			author: user
		});

		user2.posts.push(post1);
		post1.comments.push(comment);

	
		Promise.all([user.save(),post1.save(), comment.save()])
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

	it('POST /data/comment/:postId sets a comment to given post', (done) => {	
		request(app)
			.post(`/data/comment/${post1._id}`)
			.set('Authorization', 'Bearer ' + token)
			.send({content: "blablabla"})
			.end((err,response) => {
				assert(response.body.title === post1.title);
				assert(response.body.comments[1].content === 'blablabla');
				assert(response.body.comments[1].author._id.toString() === user._id.toString());	
				done();
			});
	});

	it('PUT /data/comment/:id updates a comments content', (done) => {	
		request(app)
			.put(`/data/comment/${comment._id}`)
			.set('Authorization', 'Bearer ' + token)
			.send({
				content: 'newcontent',	
			})
			.end((err,response) => {
				assert(response.text === 'OK');
				Comment.findById(comment._id)
					.then((commentN) => {	
						assert(commentN.content === 'newcontent');
						done();
					})
			});
	});


	it('DELETE /data/comment/:id removes existing comment from DB', (done) => {	
		request(app)
			.delete(`/data/comment/${comment._id}`)
			.set('Authorization', 'Bearer ' + token)
			.end((err,response) => {
				Comment.findById(comment._id)
					.then((post) => {	
						assert(post=== null);
						done();
					});
			});
	});

	it('PUT /data/comment/:id/like puts a like to an existing post and checks if this post is now followed b the requester', (done) => {	
		request(app)
			.put(`/data/comment/${comment._id}/like`)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.end((err,res) => {	
				Comment.findById(comment._id)
				 .then((commentN) => {	
				 	assert(commentN.likesCount === 1);
				 	done();
				 });
			});
	});
});