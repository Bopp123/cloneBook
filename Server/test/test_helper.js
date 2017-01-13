const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

before((done) => {
  mongoose.connect('mongodb://localhost:27017/clonebookdb_test');
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

after((done) => {  
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