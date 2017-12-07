var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require("dotenv").config();
const stripe = require("stripe")("sk_test_vAL5prlCfC16QTrEGIAeEtp9");
var jsonParser = bodyParser.json();
const models = require('../db').models;

// router.get('/', function(req,res,next) {
//     console.log('get-request');
//     res.render('webhookhbs', {});
// });

// models.payment.sync({force: true}).then(() => {
//     // Table created
//     return models.payment.create({
//       amount: 0,
//       counter: 0,
//       subscription_id: "test"
//     });
//   });

// router.post("/", jsonParser, function(request, response) {
//     var sub_id = request.body.data.object.subscription;
//     var amt = request.body.data.object.subtotal;
//     response.send(200);   
//     // client.query(`
//     //         INSERT INTO payment 
//     //         (subscription_id, amount, counter)
//     //         values
//     //         ('${sub_id}', '${amt}', '1') ON CONFLICT (subscription_id) DO UPDATE SET amount = payment.amount + ${amt}, counter = payment.counter + 1;
//     //     `
//     models.payment.findOne({ where: { subscription_id: sub_id }}).then(user => {
//         console.log("THE USER IS: !!!!!!!!!!!!!!!!!!!!!! ------ " + user);
//         if (user != null) {
//             models.payment.updateAttributes({
//                 amount: user.dataValues.amount + amt,
//                 counter: user.dataValues.counter + 1
//             }).then(user => {
//                 console.log("step 1 success");
//                 models.payment.findOne({ where: {subscription_id: sub_id }}).then(payment => {
//                     var numOfPayments = payment.dataValues.counter;
//                     if (numOfPayments >= 12) {
//                         console.log("Full year of payments");
//                         // Send subscription cancellation to stripe
//                         stripe.subscriptions.del(sub_id,function(err, confirmation) {
//                             if (err) {
//                                 response.send("Error: " + err);
//                             } else {
//                                 console.log("Great Success!");
//                                 response.send("Success");
//                             }
//                         });
//                     }
//                     else {
//                         console.log("step 2 success"); 
//                     }
//                 });     
//             });
//         } else {
//             models.payment.create({
//                 amount: amt,
//                 counter: 1,
//                 subscription_id: sub_id
//             }).then(user => {
//                 console.log("step 1 success");
//                 models.payment.findOne({ where: {subscription_id: sub_id }}).then(payment => {
//                     var numOfPayments = payment.dataValues.counter;
//                     if (numOfPayments >= 12) {
//                         console.log("Full year of payments");
//                         // Send subscription cancellation to stripe
//                         stripe.subscriptions.del(sub_id,function(err, confirmation) {
//                             if (err) {
//                                 response.send("Error: " + err);
//                             } else {
//                                 console.log("Great Success!");
//                                 response.send("Success");
//                             }
//                         });
//                     }
//                     else {
//                         console.log("step 2 success"); 
//                     }
//                 });     
//             });
//         }
//     });
// });
      
module.exports = router;