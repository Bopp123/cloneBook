/**
 * Created by koschall on 13/12/2016.
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./Server/routes/router');
const mongoose = require('mongoose');
const passport = require('passport');




const app = express();
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'test'){
    app.use(express.static(__dirname + '/Public/'));
    app.use(morgan('dev')); // log every request to the console
    mongoose.Promise = require('bluebird');
    mongoose.connect('mongodb://root:root@ds139438.mlab.com:39438/clonebookdb');
    mongoose.connection
        .once('open', () => {
            console.log('Connection to DB established');
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
}

require('./Server/config/passport');
app.use(passport.initialize());
router(app);

app.get('/clonebook', function (req,res) {
    //noinspection JSUnresolvedFunction
    res.sendFile(__dirname + "/Public/index.html");
});
// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

module.exports = app;
