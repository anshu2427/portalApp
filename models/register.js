var mongoose = require('mongoose');



const serverSchema = mongoose.Schema ({

branch: {type: String, required: true},
course: {type: String, required: true},
training: {type: String, required: true},
fullname: {type: String, required: true},
qualification: {type: String, required: true},
dob: {type: String, required: true},
email: {type: String, required: true},
address: {type: String, required: true},
contact:{type: String, required: true}

}, {collection:'registration'});


module.exports = mongoose.model('Register', serverSchema);
