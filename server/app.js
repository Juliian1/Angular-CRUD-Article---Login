const express = require('express');
const morgan = require('morgan');
var passport = require('passport');
const exphbs = require('express-handlebars');
var session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
cors = require('cors'),
http = require('http'),
path = require('path');
util = require('./Utilities/util');

const { database } = require('./keys');
const Article = require('./Models/article.model');
const app = express();
require('./passport');

// app.use(function(err, req, res, next) {
//     return res.send({ "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG });
//     });
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(flash());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

/* Routes */
app.use(require('./Routes/article'));
app.use(require('./Routes/login'));

app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next();
    });

/*first API to check if server is running*/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/index.html'));
    }); 

app.get('/images', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/assets/images'));
});

var server = app.listen(process.env.PORT || 3200, function() {
    var port = server.address().port;
    console.log('Express server running in: http://localhost:' + port + '/');
});


