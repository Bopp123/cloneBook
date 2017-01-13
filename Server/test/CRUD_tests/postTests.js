const assert = require('assert');
const Post = require('../../model/post');

describe('Testing CRUD operations for post model', () => {	
	let post, timeStamp;
	beforeEach((done) => {	
		post = new Post({
			title: 'test title',
			content: 'test content 123',
			mediaType: 'IMG',
			media: 'http://placekitten.com/200/300'
		});
		post.save()
		.then(() => {	
			timeStamp = post.updated;
			done();
		})	
	});

	it('saves a post', () => {	
		assert(!post.isNew);
	});

	it('reads a post from DB', (done) => {	
		Post.findById(post._id)
			.then((data) => {	
				assert(data.title === 'test title');
				done();
			})
			.catch((error) => {	
				console.log(error);
			});
	});

	it('updates a post', (done) => {	
		post.title = 'new title';
		post.setMedia('http://youtube.com/svswefa', 'VIDEO');
		post.save()
		.then(() => {	
			Post.findById(post._id)
			.then((data) => {	
				assert(data.updated !== timeStamp);
				assert(data.title === 'new title');
				assert(data.mediaType === 'VIDEO');
				done();
			})
		})
		.catch((error) => {	
				console.log(error);
			});
	});

	it('removes a post from DB', (done) => {	
		post.remove()
			.then(() => {	
				return Post.findById(post._id);
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