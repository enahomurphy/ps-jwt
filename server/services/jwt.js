var crypto = require('crypto');

exports.encode = function(payload, secrete) {
    var algorithm = 'HS256';
    var header = {
        typ: 'jwt',
        alg: algorithm
    }
    var jwt = base64UrlEncode(header)+'.'+base64UrlEncode(payload)
        jwt += "."+sign(jwt)

        return jwt
}

function sign(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64')
}

function base64UrlEncode(str) {
    return new Buffer(str).toString('base64')
}





//jwt contains
// -----header 
//         typ: jwt
//         hash: HS256 

// ----- payload
//         data to besent encoded in base 64

// ------ signature
//     base64 encrypted header
//     base64 encrypted payload
