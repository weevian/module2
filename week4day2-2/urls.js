var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSchema = new Schema ({
url: String,
urlId: Number,
})

module.exports = mongoose.model('Url', URLSchema)
