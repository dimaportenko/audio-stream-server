const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientId = require('../config/client_id');

passport.use(
  new GoogleStrategy({
      clientID: googleClientId.web.client_id,
      clientSecret: googleClientId.web.client_secret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
    })
);
