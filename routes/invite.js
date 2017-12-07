var express = require('express');
var router = express.Router();
var path = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var app = require('../app');
var pg = require('pg');
const models = require('../db').models;
const url = require('url');

function getFormattedUrl(req) {
    return url.format({
        // protocol: req.protocol,
        //forcing https
        protocol: 'https',
        host: req.get('host')
    });
}

router.get('/:id/email', function(req,res,next) {
    res.render('invite', {id: req.params.id});
});

router.post('/:id/email', function (req, res, next) {
    var newURL = getFormattedUrl(req);
    console.log("the id is" + req.params.id);
    models.member.findOne({ where: {id: req.params.id }})
    .then(result => {
        var emailURL = newURL + '/group/' + req.body.GroupID;
        console.log(emailURL);
        const msg = {
            to: req.body.email,
            from: 'matthew@newstorycharity.org',
            subject: "Hi "+ req.body.friendName + ", " + "I'm going to build a home!",
            html: '<p>Hey ' + req.body.friendName + " hope you're doing well!</p>" + "<p>I'm going to build a home, seriously. Not for myself, I don't quiet have those skills. But for a family in need with one of my favorite charities, New Story.</p>" + "<p>I need 5 people to join with me to donate $50 or $25 a month for 12 months. (5 people x $100 x 12months = $6000 = A HOME) </p>" + "<p>It's that simple for us to build an entire HOME for a family in huge need.</p>" + "<p>Would you like to join me? Here is the link: </p>" + emailURL  + '<p>Thanks, </p>' + result.dataValues.name ,
        };
        sgMail.send(msg);
        
        res.send({
            url: emailURL
        });
        return;
    });
});

module.exports = router;