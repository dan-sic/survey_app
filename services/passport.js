const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user');


passport.use( new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},
    async (token, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id})

                if (existingUser) {
                    done(null, existingUser)
                } else {
                    const user = await new User({ googleId: profile.id}).save()
                    
                    done(null, user)
                }

    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user))
})