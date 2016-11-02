var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    User = require('./models/user')


app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
})

app.post('/register', function(req, res) {
    var user  = new User(req.body) ;
    user.save(function(err, data) {
        if (err) return res.send(err)
        return  res.send(data.toJson())
    })

})




mongoose.connect('mongodb://127.0.0.1/pjwt', function(err) {
    if(err) console.log(err.message);
    console.lgo('whala we are connected');
})
app.listen(process.env.PORT || 3000);