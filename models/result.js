var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var resultSchema = new Schema ({

rstudentname: {type: String, required: true},
rdob: {type: String, required: true},
rdoj: {type: String, required: true},
rcourse: {type: String, required: true},
rfathername: {type: String, required: true},
rrollnumber: {type: String, required: true, unique: true},
ryear: {type: String, required: true},
uploadmarksheet: {type: String},
uploadcertificate: {type: String}

}, {collection:'resultupload'});



module.exports = mongoose.model('Result', resultSchema);
