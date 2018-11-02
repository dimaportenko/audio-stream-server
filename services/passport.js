const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientId = require('../config/client_id');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
      clientID: googleClientId.web.client_id,
      clientSecret: googleClientId.web.client_secret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails.find(item => item.type === 'account');
        console.log(email);
        const user = await User.findOne({ email: email.value });
        if (user) {
          done(null, user);
        } else {
          const newUser = await new User({
            googleId: profile.id,
            name: profile.displayName,
            email: email.value,
          }).save();
          done(null, newUser);
        }
      } catch (e) {
        console.log(e);
      }
    })
);
