var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs')
var userShema = mongoose.Schema({
    name : { type: String, required: true},
    username: {type: String, required: true, uniqu: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userShema.pre('save', function(next){
    var self = this
    if(!self.isModified('password')) return next()
    bycrypt.hash(this.password, null, null, function(err,hash){
        if(err) return next(err)
        this.password = hash
        next()
    } )
})

userShema.methods.toJson = function(){
    user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('users', userShema)

