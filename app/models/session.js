var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SessionSchema   = new Schema({
	app: {
    	name: String,
        version: String
  	},
  	device: {
  		name: String,
  		resolution : {
  			width : Number,
  			height: Number
  		},
  		ip: String,
  		uuid: String
  	},
  	os: {
  		platform : String,
  		version : String
  	}
});

module.exports = mongoose.model('Session', SessionSchema);