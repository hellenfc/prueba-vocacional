var Test = require('../models/test');
var bodyParser = require('body-parser');

module.exports = function(express){
  var testApi = express.Router();
  //Endpoint to all test

  //Endpoint to especific category
  testApi.route('/tests/:categoryId')
  .get(function(req, res){
    Test.find({category : req.params.categoryId}, function(err, tests){
      if(err){
        res.json({success: false, message: 'Error'});
      }else{
        res.json(tests);
      }
    });
  })
  //Endpoint to especific test
  testApi.route('/test/:testId')
  .get(function(req, res){
    Test.findById(req.params.testId, function(err, test){
      if(err){
        res.json({success: false, message: 'Error'});
      }else{
        res.json(test);
      }
    });
  });

  testApi.route('/answer')
  .post(function(req,res){
    console.log(req.body.answer);
  })
  return testApi;
}
