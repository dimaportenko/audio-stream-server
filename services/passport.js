const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientId = require('../config/client_id');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy({
      clientID: googleClientId.web.client_id,
      clientSecret: googleClientId.web.client_secret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails.find(item => item.type === 'account');
      console.log(email);
      User.findOne({ email: email.value })
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            new User({
              googleId: profile.id,
              name: profile.displayName,
              email: email.value,
            }).save()
              .then(newUser => done(null, newUser));
          }
        });
    })
);
