var Test = require('../models/test');

module.exports = function(express){
  var expertApi = express.Router();
  expertApi.route('/test')
  .get(function(req, res){
    Test.find({}, function(err, tests){
      if(err){
        res.json({success: false, message:'Error'});
      }else{
        res.json(tests);
      }
    });
  })
  .post(function(req, res){
    var test = new Test();
    test.category = req.body.category;
    test.questions = req.body.questions;
    test.save(function(err){
      if(err){
        res.json({success: false, message: 'Error ocurred'});
      }else{
        res.json({success: true, message: 'Test succesfuly created'});
      };
    });
  });

  return expertApi;
}
