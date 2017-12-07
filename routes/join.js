var express = require('express');
var router = express.Router();
var path = require('path');
require("dotenv").config();
var bcrypt = require('bcrypt');
const models = require('../db').models;

// models.member.sync({force: true}).then(() => {
//     // Table created
//     return models.member.create({
//       name: 'test',
//       lastname: 'test',
//       email: 'test@gmail.com',
//       password: 'test',
//       amount: 0,
//       description: 'test',
//       headshot: 'test',
//       support: []
//     });
//   });



/* GET users listing. */
router.get('/', function(req,res,next) {
    res.render('join', {});
});

/* POST NEW GROUP */
router.post('/', function(req, res, next) {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        models.member.create({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            amount: 0,
            description: "Hey friends! New Story is one of my favorite charities. I'm really excited about this opportunity for us to join together to build a house for a family over the course of a year. Together, we can make it happen!",
            headshot: "../images/headshot/headshot-placeholder.png",
            support: ['Be the first donor!']
        }).then(result => {
            var id = result.dataValues.id;
            // console.log("The id is: " + result.dataValues.id);
            // console.log("The TYPE OF the id is: " + typeof result.dataValues.id);
            // console.log("This is the result: " + result);
            res.cookie("isOwner", "True", {path: '/group/' + id});
            res.redirect('/group/' + id);
        });
    })
});

module.exports = router;