var express = require('express');
var router = express.Router();
var path = require('path');
require("dotenv").config();
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
const models = require('../db').models;

/* GET users listing. */
router.get('/', function(req,res,next) {
    res.render('login', {});
});

/* PASSPORT */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    (username, password, done) => {
    // Check if plain password is == to hashed password and set password == to hash password
    return models.member.findOne({ where: {email: username}})
        .then((user)=> {
        console.log(user);
        bcrypt.compare(password, user.dataValues.password).then(function(res){
            if (res == true) {
                return done(null, user);   
            }
        }).catch((err) => {
            console.error("/login: " + err);
            return done(null, false, {message:'Wrong user name or password'});
        });
        })
    }));

// PASSPORT SERIALIZE
passport.serializeUser((user, done)=>{
    console.log("SERIALIZE " + user);
    done(null, user.dataValues.id);
});

// PASSPORT DESERIALIZE
passport.deserializeUser((id, done)=>{
    models.member.findOne({ where: {id: id}})
    .then((user)=>{
        done(null, user);      
    })
    .catch((err)=>{
        done(new Error(`User with the id ${id} does not exist`));
    })
});

/* POST */
router.post('/', function(req,res,next) { passport.authenticate('local', function(err, user, result) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    res.cookie("isOwner", "True", {path: '/group/' + user.dataValues.id});
    return res.redirect('/group/'+ user.dataValues.id);
    })(req, res, next);
});


module.exports = router;