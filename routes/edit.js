const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
const models = require('../db').models;
var formidable = require('formidable'),
http = require('http'),
util = require('util');

router.get('/:id/edit', function(req, res, next) {
    if (req.cookies.isOwner) {
        res.render('edit', {id: req.params.id});
    } else {
        res.redirect('/group/' + req.params.id);
    }
});

router.post('/:id/edit', function(req, res, next) {
    // delete req.app.use(bodyParser());
    // console.log(path.dirname())
    console.log("BEGINNING");
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "public/images/headshots";
    form.maxFieldsSize = 10 * 1024 * 1024;

    console.log("MIDDLE");

    form.parse(req, function(err, fields, files) {
        console.log("YAY");
        if (err) {
            res.send("Failed because " + err);
        }
        console.log("HERE");
        console.log(fields);
        var newPath = files.upload.path;
        console.log("---------------");
        newPath = newPath.split('/');
        console.log(newPath);
        console.log("---------------");
        newPath = newPath.splice(1, 3);
        console.log(newPath);
        console.log("---------------");
        newPath = newPath.join('/');
        console.log(newPath);
        console.log("---------------");
        models.member.update({ name: fields.name, lastname: fields.lastname, description: fields.description, headshot: "../" + newPath}, { where: {id: req.params.id}});
        // pathImg = files.upload.path;
        console.log(files.upload.path);
    });

    console.log("AFTER");
    // console.log(pathImg)

    
    res.redirect('/group/' + req.params.id);
    
});

module.exports = router;