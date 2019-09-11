var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var KindergartenSchema = new Schema ({
name: String,
description: String,
email: String,
phone: String, // phone number data type cannot be number
// because number does not allow to start from 0 or add +
url: String,
opening_hours:[String],
image_url: String,
latitude: Number,
longitude: Number
})

module.exports = mongoose.model('Kindergarten', KindergartenSchema)