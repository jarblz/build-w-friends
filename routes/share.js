var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
const models = require('../db').models;

router.get('/:id/invite', function(req,res,next) {
    models.member.findOne({ where: {id: req.params.id}}).then(user => {
        var name = user.dataValues.name;
        var lastname = user.dataValues.lastname;
        res.render('share', {id: req.params.id, name: name, lastname: lastname});
    });
});

module.exports = router;