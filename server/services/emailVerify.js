var _ = require('underscore'),
    jwt = require('jwt-simple'),
    fs = require('fs'),
    path = require('path')
    config = require('./config'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport')

exports.send = function (email) {
    var payload = {
        sub: email
    }
    var token = jwt.encode(payload, config.EMAIL_SECRETE);

    var smtpOptions = {
        host: 'sv83.ifastnet.com',
        port: 290,
        secure: true, // use SSL
        auth: {
            user: config.SMTP_USER,
            pass: config.SMTP_PASS
        }
    }

    getHtml(token, function(err, body) {
        if(err) throw err
        //console.log(mail)
        var transporter = nodemailer.createTransport(smtpTransport(smtpOptions))

        var mailOptions = {
            from: '"Job Finder 👥" <foo@jobfinder.com>',
            to: email,
            subject: 'email verificaion',
            html: body
        };
        transporter.sendMail(mailOptions, function(err, info){
            if(err) throw err
            console.log('mail sent ' + info.response)
        })
    })
}

function getHtml (token, cb) {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };
    var model = {
        header : "THE JOB FIINDER APP",
        subHeader: " find all kinds of job in nigeria ",
        body :  "Welcome to Job finder app. you are almost there just one more step to complete the process \
        kindly click on the verify link below to verify your account",
        link : 'http://localhost/9000/emailVerification?token='+token
    }

    fs.readFile('views/emailVerification.html', function (err, html) {
            if (err) throw err

            var template = _.template(html.toString())

            //console.log(template(model))
            cb(err, template(model))
    })
}