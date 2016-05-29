var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');

app.use(morgan('dev'));

mongoose.connect(config.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set assets folder
app.use(express.static(__dirname + '/client'));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//Test Api
var testApi = require('./server/api/testApi')(express);
app.use('/api', testApi);
//Auth Api
var apiAuth = require('./server/api/authApi')(express);
app.use('/api', apiAuth);
//Expert Api
var expertApi = require('./server/api/expertApi')(express);
app.use('/api', expertApi);

//Home Route
app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

app.listen(config.PORT);

console.log('Server running on',config.PORT);
