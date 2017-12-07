var express = require('express');
var router = express.Router();
var path = require('path');
var mailer = require('express-mailer');
var Guid = require('guid');
var app = require('../app');
var bcrypt = require('bcrypt');
const models = require('../db').models;

// models.passReset.sync({force: true}).then(() => {
//     // Table created
//     return models.passReset.create({
//       email: 'test@test.com',
//       link: 'www.test.com'
//     });
//   });

router.get('/:guid', function(req,res,next) {
    res.render('change-password', {});
});

router.post('/:guid', function(req, res, next) {
    console.log(req.params.guid);
    models.passReset.findOne({ where: {link: req.params.guid }})
    .then(user => {
        var email = user.dataValues.email;
        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
            models.member.findOne({ where: {email: email }})
            .then(user => {
                user.updateAttributes({
                    password: hash
                });
                res.redirect('/login');
            }).catch(err => {
                console.log(err);
            });
        });
    });
}); 

module.exports = router;