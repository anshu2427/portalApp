var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var courseSchema = new Schema ({

maincoursename: {type: String, required: true},
subcoursename: {type: String, required: true},
tsc: {type: String, required: false},
tfscn: {type: String, required: false},
bcn: {type: String, required: false},
td1: {type: String, required: false},
td2: {type: String, required: false},
td3: {type: String, required: false},
td4: {type: String, required: false}

}, {collection:'courseInfo'});



module.exports = mongoose.model('Course', courseSchema);
