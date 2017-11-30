const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//Connecting to database
mongoose.connect(keys.mongoURI);

//creating an app instance
const app = express();

//bodyParser is middleware for express and for use that middleware we need to use in that express app.
app.use(bodyParser.json());

//Cookie session is middleware which is used to maintain cookies in the system
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//Passport is middleware which is used to authenticate user with strategy that are used. For e.g., google-Oauth
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//Code run on the heroku environment only for handling the client side code
if (process.env.NODE_ENV === 'production') {
    //express will serve up production assets like our main.js file  or main.css file
    app.use(express.static('client/build'));

    //express will server up index.html if it is not recognize the routes
    const path = require('path');
    app.get('*', (req, res) => {
       res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000; //env variable is not defined when we are using on localhost 
app.listen(PORT);