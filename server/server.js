var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    passport = require('passport'),

    
    facebook = require('./services/facebookAuth'),
    createToken = require('./services/jwt').createToken,
    googleAuth = require('./services/googleAuth'),
    jobs = require('./services/jobs'),
    passportStrategy = require('./services/passportStrategy')

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

passport.use('login', passportStrategy.login)
passport.use('register', passportStrategy.register )

app.get('/users', function (req, res) {
    return res.send('hello world')
})

app.post('/register', passport.authenticate('register',{ failWithError: true }), function (req, res) {
    console.log(req.user)
    createToken(res, req.user)
})

app.get('/jobs', jobs)
app.post('/login',  passport.authenticate('login') , function (req, res, next) {
    createToken(res, req.user)
})

app.post('/auth/facebook', facebook)
app.post('/auth/google', googleAuth)

mongoose.connect('mongodb://127.0.0.1/pjwt', function (err) {
    if (err) console.log(err.message);
    console.log('whala we are connected');
})
app.listen(process.env.PORT || 3000);

// var f = jwt.decode('eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJzdWIiOiI1ODFiNDAxNmU1MTg1OTAzYWNlODAwNmUifQ==.AglBCnT8+uttYkIidOQaM88IIxbsARDilsPO7rLZxjI=', 'hjlugausdgfuasudfajdfjabdjfbjasbdfjbadjkfckj')
// console.log(f)
