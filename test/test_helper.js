const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://root:root@ds011462.mlab.com:11462/clitterdb');
  mongoose.connection
    .once('open', () => { 
    	console.log('Good To Go!');
    	done(); 
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});


beforeEach((done) => {	
	const {users, comments, posts, friendships} = mongoose.connection.collections;
	users.drop(() => {	
		comments.drop(() => {	
			posts.drop(() => {	
        friendships.drop(() => {
          done();
        });
			});
		});
	});
});
