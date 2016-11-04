var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),


    User = require('./models/user'),
    jwt = require('./services/jwt')

app.use(morgan())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(function (req, res, next) {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next()
})

var jobs = [
    'UN Information Systems Officer Job',
    'Sales Executive Jobs NCR',
    'ADB Network Engineer Job'
]

var createToken = function (res, user) {

    var payload = {
        sub: user.id
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

app.post('/register', function (req, res) {
    //console.log(req.body)
    var user = new User(req.body);
    user.save(function (err, data) {
        if (err) return res.status(400).send(err.message);
        createToken(res, user)
    })

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
app.post('/login', function (req, res) {
    console.log(req.body)
    email = req.body.email;
    password = req.body.password;
    if (!email || !password)
        return res.status(400).json({
            message: 'invalid email/password'
        })

    User.findOne({ email: email }, function (err, data) {
        if (err) throw err
        if (!data)
            return res.status(400).json({ message: 'invalid email/password'});
       // console.log(data.comparePassword(password))
        data.comparePassword(password, function(status){
            console.log(status)
            if(!status)
                return res.status(400).json({ message: 'invalid email/password' })
            createToken(res, data)
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
