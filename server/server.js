var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    request = require('request')

    User = require('./models/user'),
    jwt = require('./services/jwt')

app.use(morgan())
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(function (req, res, next) {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next()
})


passport.serializeUser(function(user, done) {
    return done(null, user.id)
})



passport.use(new localStrategy({
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
}))

passport.use('register', new localStrategy({
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


}))
var jobs = [
    'UN Information Systems Officer Job',
    'Sales Executive Jobs NCR',
    'ADB Network Engineer Job'
]

var createToken = function (res, user) {

    var payload = {
        sub: user._id
    }
    var token = jwt.encode(payload, 'hjlugausdgfuasudfajdfjabdjfbjasbdfjbadjkfckj');
    return res.send({
        user: user.toJson(),
        token: token
    })
}

app.get('/users', function (req, res) {
    return res.send('hello world')
})

app.post('/register', passport.authenticate('register',{ failWithError: true }), function (req, res) {
    createToken(res, req.user)
})

app.get('/jobs', function (req, res) {
    if (!req.headers.authorization)
        return res.status(401).send({
            message: 'unauthorize: unable to access this route'
        })

    payload = jwt.decode(req.headers.authorization, 'hjlugausdgfuasudfajdfjabdjfbjasbdfjbadjkfckj')
    console.log(payload)
    if (!payload.sub)
        return res.status(401).json({
            message: 'unauthorize: invalid payload'
        })
    return res.send(jobs)
})
app.post('/login',  passport.authenticate('local') , function (req, res, next) {
    createToken(res, req.user)
})

app.post('/auth/google', function(req, res) {
    var url = 'https://www.googleapis.com/oauth2/v4/token',
        googlePlus= 'https://www.googleapis.com/plus/v1/people/me/openIdConnect' 
        query = {
        code : req.body.code,
        client_id	: req.body.client_id,
        redirect_uri: req.body.redirect_uri,
        client_secret: '1Tp09cHWzYsuROS9oATfzHN-',
        grant_type: 'authorization_code',
    }

    request.post({url:url, form:query }, function(err, response, body) {
        console.log(body)
        var token = body.acsess_token,
            headers = {
                'Authorization': 'Bearer '+ token
            }
        request.get({url: googlePlus, headers:headers, json: true}, function(err, response, body) {
            console.log(body)
        })
    })
})

mongoose.connect('mongodb://127.0.0.1/pjwt', function (err) {
    if (err) console.log(err.message);
    console.log('whala we are connected');
})
app.listen(process.env.PORT || 3000);

// var f = jwt.decode('eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJzdWIiOiI1ODFiNDAxNmU1MTg1OTAzYWNlODAwNmUifQ==.AglBCnT8+uttYkIidOQaM88IIxbsARDilsPO7rLZxjI=', 'hjlugausdgfuasudfajdfjabdjfbjasbdfjbadjkfckj')
// console.log(f)
