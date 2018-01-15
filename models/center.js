var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var centerSchema = new Schema ({

centername: {type: String, required: true},
centermobile: {type: String, required: true},
centerphone: {type: String, required: true},
centeremail: {type: String, required: true},
directorname: {type: String, required: true},
centerlandmark: {type: String, required: true},
centeraddress: {type: String, required: true},
centerimage: {type: String, required: true}

}, {collection:'centerInfo'});



module.exports = mongoose.model('Center', centerSchema);
