var User = require('../models/user'),
    request = require('request'),
    config = require('./config')
    
module.exports = function(req, res) {
    console.log(req.body, config)
    var url = 'https://www.googleapis.com/oauth2/v4/token',
        googlePlus= 'https://www.googleapis.com/plus/v1/people/me' 
        query = {
        code : req.body.code,
        client_id	: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.GOOGLE_SECRETE,
        grant_type: 'authorization_code',
    }
    request.post({url:url, form:query }, function(err, response, body) {
        var val = JSON.parse(body)
        if(val.access_token){

            console.log(val)
            var token = body['access_token'],
            headers = {
                'Authorization': 'Bearer '+ val.access_token
            }
            request.get({url: googlePlus, headers:headers, json: true}, function(err, response, body) {
                console.log(body.emails[0].value)
                // check if user exist
                User.findOne({ email: body.emails[0].value }, function(err, data) {
                    if(err) return err
                    console.log(data)
                    if(data)  createToken(res, data)

                    else{
                        // create new user
                        var user = new User({
                            name : body.name.familyName +' '+ body.name.givenName,
                            email :  body.emails[0].value,
                            googleId : body.id
                        })
                        console.log(user)
                        user.save().then(function(data) {
                            if(err) return err
                            console.log('saved')
                            createToken(res, data)
                        })
                        .catch(function(err) {
                            console.log(err)
                            throw err
                        })

                    }
                })
               
            })
        }
            
    })
}