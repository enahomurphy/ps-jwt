var jwt = require('jwt-simple')
module.exports = function (req, res) {
    var rawToken = req.headers.authorization
    if (!rawToken)
        return res.status(401).send({
            message: 'unauthorize: unable to access this ieieiei'
        })
    token = rawToken.split(' ')
    payload = jwt.decode(token[1], 'hjlugausdgfuasudfajdfjabdjfbjasbdfjbadjkfckj')
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