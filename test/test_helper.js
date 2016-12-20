const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://root:root@ds139278.mlab.com:39278/clonebookdb_test');
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
