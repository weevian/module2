var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestampSchema = new Schema ({
dateCheck: String
})

module.exports = mongoose.model('Timestamp', timestampSchema)
