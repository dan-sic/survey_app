const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user');


passport.use( new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: '/auth/google/callback'
},
    (token, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
            .then(user => {
                if (user) {
                    done(null, user)
                } else {
                    new User({ googleId: profile.id}).save().then(user => done(null, user));
                }
            })
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user))
})