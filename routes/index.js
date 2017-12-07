var express = require('express');
var router = express.Router();
var path = require('path');
const models = require('../db').models;

router.get('/:id', function(req, res, next) {
  models.member.findOne({ where: {id: req.params.id}}).then(user => {
    console.log(user.get('name'));
    var name = user.dataValues.name;
    var lastname = user.dataValues.lastname;
    var amount = user.dataValues.amount;
    var description = user.dataValues.description;
    var headshot = user.dataValues.headshot;
    var support = user.dataValues.support;
    var initials = support.map(function(name) {
      if(name) {
        var array = name.split(" ");
        switch ( array.length ) {
            case 1:
                return array[0].charAt(0).toUpperCase();
                break;
            default:
                return array[0].charAt(0).toUpperCase() + array[ array.length -1 ].charAt(0).toUpperCase();
        }
      }
    });
    var supportObj = [];
    support.forEach((name, i) => supportObj.push({initial: initials[i], name: name}));
    console.log(supportObj);
    res.render('index', {name: name, lastname: lastname, id: req.params.id, isOwner: req.cookies.isOwner, amount: amount, description: description, headshot: headshot, supportObj: supportObj});
  });
});

module.exports = router;
