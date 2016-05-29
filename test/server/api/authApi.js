var bodyParser = require('body-parser'); 	// get body-parser
var Expert       = require('../models/expert');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var superSecret = config.SECRET;

module.exports = function(express){
  var apiAuth = express.Router();
  apiAuth.post('/authenticate', function(req, res) {
	  // find the user
	  Expert.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {
	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.json({
	      	success: false,
	      	message: 'Authentication failed. Expert not found.'
	    	});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({
	        	success: false,
	        	message: 'Authentication failed. Wrong password.'
	      	});
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresIn: 60 * 60 * 24 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }
	    }
    });
  });
  // route middleware to verify a token
	apiAuth.use(function(req, res, next) {
	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {

	      if (err) {
	        res.status(403).send({
	        	success: false,
	        	message: 'Failed to authenticate token.'
	    	});
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;

	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({
   	 		success: false,
   	 		message: 'No token provided.'
   	 	});

	  }
	});
  apiAuth.route('/register')

		.post(function(req, res) {

			var user = new Expert();
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;
			user.save(function(err) {
				if (err) {
					if (err.code == 11000)
						return res.json({ success: false, message: 'A user with that username already exists.'});
					else
						return res.send(err);
				}
				res.json({ message: 'Expert created' });
			});

		})

  return apiAuth;
}
