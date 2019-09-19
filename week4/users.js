var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require ('bcrypt-node')

var UserSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

UserSchema.pre('save', function(callback){
var user = this;

if (!user.isModified('password')) return callback();
bcrypt.genSalt(5, function(err, salt){
    if (err) return callback (err);
    bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return callback (err);
        user.password = hash;
        callback();
    })
    })
})

module.exports = mongoose.model('User', UserSchema)
