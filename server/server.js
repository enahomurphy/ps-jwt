var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),


    User = require('./models/user'),
    jwt = require('./services/jwt')

app.use(morgan())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }))
app.use(function(req, res, next) {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next()
})

app.get('/users',function(req, res) {
    return res.send('hello world')
})

app.post('/register', function(req, res) {
    console.log(req.body)
    var user  = new User(req.body) ;
    user.save(function(err, data) {
        if (err) return res.status(400).send(err.message);
        var payload = {
            iss: req.hostname,
            sub: data._id
        }
        var token = jwt.encode(payload, 'hjlugausdgfuasudfajdfjabdjfbjasbdfjbadjkfckj');
        return  res.send({
            user: data.toJson(),
            token : token
        })
    })

})




mongoose.connect('mongodb://127.0.0.1/pjwt', function(err) {
    if(err) console.log(err.message);
    console.log('whala we are connected');
})
app.listen(process.env.PORT || 3000);