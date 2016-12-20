const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');

const app = express(); 
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 
app.use(morgan('dev')); // log every request to the console

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root@ds139438.mlab.com:39438/clonebookdb');
mongoose.connection
.once('open', () => { 
	console.log('Connection to DB established');
})
.on('error', (error) => {
  console.warn('Warning', error);
});

router(app);

module.exports = app;
