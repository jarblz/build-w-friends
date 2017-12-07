var express = require('express');
var router = express.Router();
var path = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var Guid = require('guid');
var app = require('../app');
const models = require('../db').models;
const url = require('url');

function getFormattedUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
}

router.get('/', function(req,res,next) {
    res.render('password-reset', {});
});

router.post('/', function(req, res, next) {
    var newURL = getFormattedUrl(req);
    var guid = Guid.create();
    var link = guid.value;
    models.passReset.create({
        email: req.body.email,
        link: link
    }).then(user => {
        const msg = {
            to: req.body.email,
            from: 'matthew@newstorycharity.org',
            subject: "Reset your New Story account password",
            html: '<p>Reset your password at: ' + newURL + "/password-reset/" + link  + '</p>',
        };
        sgMail.send(msg);
        res.redirect('login');
    });
});

module.exports = router;