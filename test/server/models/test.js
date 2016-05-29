var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
   category : {type: String, required: true},
   createdAt : {type: Date, required: true, default: Date.now},
   questions : [{
				question: {type: String, required: true}
			}
	]
});

module.exports = mongoose.model('Test', testSchema);
