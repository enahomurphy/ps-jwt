var User = require('../models/user'),
    localStrategy = require('passport-local').Strategy

module.exports.register = new localStrategy({
        passReqToCallback: true
    },function(req, username, password, done){
        email = req.body.email;
        if(!email) return done(null, false ,{ message: 'please fill in all fields'});

        User.findOne({email: email}, function(err, user){
            if(err) return done(err);
            if(user) return done(null, false, { message: "user with that email already exist"});
            console.log(req.body)
            var newUser = new User(req.body)
            newUser.save(function(err) {
                if(err) return done(err);

                return done(null, newUser)
            })
        })
    })

module.exports.login = new localStrategy({
        usernameField : 'email'
    }, function (username, password, done) {
        //console.log(username, password)
        User.findOne({ email: username }, function (err, user) {
            if (err) return done(err)
        
            if (!user)
                return  done(null, false, {message: 'invalid email/password'})
            user.comparePassword(password, function(isValid){
                if(!isValid)
                    return done(null, false, {message: 'invalid email/password'})
            return  done(null, user)
            })
            
        })
    })