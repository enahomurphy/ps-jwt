var request = require('request'),
    User = require('../models/user')
    createToken = require('./jwt').createToken
    config = require('./config')
module.exports = function(req, res) {

    console.log(req.body)
    var url  = 'https://graph.facebook.com/v2.8/oauth/access_token?'
        user = 'https://graph.facebook.com/v2.8/me',
        tokeQuery = {
            client_id: req.body.clientId,
            redirect_uri: req.body.redirectUri,
            client_secret: config.FACEBOOK_SECRETE,
            code: req.body.code
        }
        userQuery = {
            fields:'id,name,email'
        }
       

   request.get({url: url , qs: tokeQuery}, function(err, response, body) {
        val = JSON.parse(body)
        headers = {
            'Authorization': 'Bearer '+ val.access_token
        }
       request.get({url:user, headers: headers, qs:userQuery}, function(err, response, data){
           var user = JSON.parse(data)
           User.findOne({email: user.email})
                .then(function(data) {
                    if(data)
                        createToken(res, data)
                    else{
                        var newUser = new User({
                            name: user.name,
                            email: user.email
                        })
                        newUser.save()
                            .then(function(data) {
                                createToken(res, data)
                            })
                            .catch(function(err){
                                throw err
                            })
                    }
                })

       })
   })


}