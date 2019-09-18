var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// child schema must be above parent schema
var ReviewSchema = new Schema ({
    username: String,
    rating: Number,
    message: String
})

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
longitude: Number,
avgRating: {type: Number, default:0},
reviews: [ReviewSchema],
createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Kindergarten', KindergartenSchema)