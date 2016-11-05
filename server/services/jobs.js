var jwt = require('jwt-simple'),
    config = require('./config')

module.exports = function (req, res) {
    var rawToken = req.headers.authorization
    if (!rawToken)
        return res.status(401).send({
            message: 'unauthorize: unable to access this ieieiei'
        })
    token = rawToken.split(' ')
    payload = jwt.decode(token[1], config.APP_SECRETE)
        // console.log(payload)
    if (!payload.sub)
        return res.status(401).json({
            message: 'unauthorize: invalid payload'
        })
    return res.send(jobs)
}

var jobs = [
    'UN Information Systems Officer Job',
    'Sales Executive Jobs NCR',
    'ADB Network Engineer Job'
]