
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            //Commenting below code as we will use async-await instead of promise
            User.findOne({googleId: profile.id}).then((exisitingUser) => {
                if (exisitingUser) {
                    //Already have the record with the given profile id
                    done(null, exisitingUser);
                } else {
                    //We don't have the record, create a new one
                    new User({ googleId: profile.id})
                        .save()
                        .then((user) => {
                            done(null, user);
                        });
                }
            });
        }
        /*async (accessToken, refreshToken, profile, done) => {
            //will work with update node version 8
            const exisitingUser = await User.findOne({googleId: profile.id});
            if (exisitingUser) {
                return done(null, exisitingUser);
            } 
            
            const user = await new User({ googleId: profile.id}).save();
            done(null, user);
        }*/
    )
);