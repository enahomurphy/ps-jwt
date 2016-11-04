var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs')
    mongoose.Promise = require('bluebird')

var userShema = mongoose.Schema({
    name : { type: String, required: true},
    username: {type: String, default: ""},
    email: {type: String, required: true, unique: true},
    googleId: { type: String, unique: true, default: ""},
    password: {type: String}
})

userShema.pre('save', function(next){
    var self = this
    if(!self.isModified('password')) return next()
    bcrypt.hash(self.password, null, null, function(err,hash){
        if(err) return next(err)
        self.password = hash
        next()
    } )
})
userShema.methods.comparePassword = function(password, cb) {

   return  bcrypt.compare(password, this.password, function(err, res) {
        if (err) throw err
        // console.log(res)
        cb(res)
    })
}
userShema.methods.toJson = function(){
    user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('users', userShema)

