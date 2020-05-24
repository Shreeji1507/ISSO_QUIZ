var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quiz_bank_schema = new Schema({
    // different fields
    field1: {type: String, required: true},
    field2: {type: String, required: true},
    field3: {type: String, required: true},
    field4: {type: Number, required: true}
 });

module.exports = mongoose.model('QuizBank', quiz_bank_schema);
