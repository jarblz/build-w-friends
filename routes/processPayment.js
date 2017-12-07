var express = require('express');
var router = express.Router();
require("dotenv").config();
var path = require('path');
const stripe = require("stripe")("sk_test_vAL5prlCfC16QTrEGIAeEtp9");
const models = require('../db').models;

//TIER 1
router.post("/tier1", (req, res) => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer => 
    stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: "10-monthly",
        }
      ]
    })
  .then(charge => {
    models.member.findOne({ where: { id: req.query.orig }}).then(result => {
      result.dataValues.support.push(customer.sources.data[0].name)
      models.member.update({
        amount: result.dataValues.amount + 10,
        support: result.dataValues.support
      }, {
        where: {
          id: req.query.orig
        }
      })
    });
    res.send(charge)
    // res.redirect('https://newstorycharity.org/home-monthly-thank-you/');
    
  })
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  })
);
});

//TIER 2
router.post("/tier2", (req, res) => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: "25-monthly",
        }
      ]
    })
    .then(charge => {
      models.member.findOne({ where: { id: req.query.orig }}).then(result => {
        result.dataValues.support.push(customer.sources.data[0].name)
        models.member.update({
          amount: result.dataValues.amount + 25,
          support: result.dataValues.support
        }, {
          where: {
            id: req.query.orig
          }
        })
      });
      res.send(charge)
    })
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  }));
});

//TIER 3
router.post("/tier3", (req, res) => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: "50-monthly",
        }
      ]
    })
    .then(charge => {
      models.member.findOne({ where: { id: req.query.orig }}).then(result => {
        result.dataValues.support.push(customer.sources.data[0].name)
        models.member.update({
          amount: result.dataValues.amount + 50,
          support: result.dataValues.support
        }, {
          where: {
            id: req.query.orig
          }
        })
      });
      res.send(charge)
    })
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  }));
});

//TIER 4
router.post("/tier4", (req, res) => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: "100-monthly",
        }
      ]
    })
    .then(charge => {
      models.member.findOne({ where: { id: req.query.orig }}).then(result => {
        result.dataValues.support.push(customer.sources.data[0].name)
        models.member.update({
          amount: result.dataValues.amount + 100,
          support: result.dataValues.support
        }, {
          where: {
            id: req.query.orig
          }
        })
      });
      res.send(charge)
    })
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  }));
});

//TIER 5
router.post("/tier5", (req, res) => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: "250-monthly",
        }
      ]
    })
    .then(charge => {
      models.member.findOne({ where: { id: req.query.orig }}).then(result => {
        result.dataValues.support.push(customer.sources.data[0].name)
        models.member.update({
          amount: result.dataValues.amount + 250,
          support: result.dataValues.support
        }, {
          where: {
            id: req.query.orig
          }
        })
      });
      res.send(charge)
    })
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  }));
});

//TIER 6
router.post("/tier6", (req, res) => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: "500-monthly",
        }
      ]
    })
    .then(charge => {
      models.member.findOne({ where: { id: req.query.orig }}).then(result => {
        result.dataValues.support.push(customer.sources.data[0].name)
        models.member.update({
          amount: result.dataValues.amount + 500,
          support: result.dataValues.support
        }, {
          where: {
            id: req.query.orig
          }
        })
      });
      res.send(charge)
    })
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  }));
});

//TIER 7
router.post("/tier7", (req, res) => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: "1000-monthly",
        }
      ]
    })
    .then(charge => {
      models.member.findOne({ where: { id: req.query.orig }}).then(result => {
        result.dataValues.support.push(customer.sources.data[0].name)
        models.member.update({
          amount: result.dataValues.amount + 1000,
          support: result.dataValues.support
        }, {
          where: {
            id: req.query.orig
          }
        })
      });
      res.send(charge)
      
    })
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  }));
});

module.exports = router;