const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/handlePayment', requireLogin, (req, res) => {
        //console.log(req.body);
        stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id,
            description: "$5 for credits 5, Charge for " + req.body.email
        }).then((charge) => {
            //console.log(charge);
            req.user.credits += 5;
            req.user.save().then((user) => {
                res.send(user);
            })
        });
    });
};