var crypto = require('crypto');

exports.encode = function(payload, secrete) {
    var algorithm = 'HS256';
    var header = {
        typ: 'jwt',
        alg: algorithm
    }
    var jwt = base64UrlEncode(JSON.stringify(header))+'.'+base64UrlEncode(JSON.stringify(payload))
        jwt += "."+sign(jwt, secrete)

        return jwt
}
exports.decode = function(token, secrete) {
    var rawToken = token.split(' ')
    if (rawToken.length !== 2 )
        throw new Error('Authentication failed invalid token') 

    rawToken = rawToken[1];
    var segments = rawToken.split('.')

    if(segments.length !== 3) 
        throw new Error('Authentication failed invalid token');

    var header = JSON.parse(base64Decode(segments[0], secrete));
    var payload = JSON.parse(base64Decode(segments[1], secrete));
    var rawSignature = segments[0]+'.'+segments[1]
   
    if(!verify(rawSignature, secrete, segments[2]))
        throw new Error('Authentication failed invalid token');
    
    return payload
}

function verify(rawSignature, key, signature) {
    return signature === sign(rawSignature, key)
}

function base64Decode(str) {
    return new Buffer(str, 'base64').toString()
}

function sign(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64')
}

function base64UrlEncode(str) {
    return new Buffer(str).toString('base64')
}



