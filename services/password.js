const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const appKeys = require('../config/keys');

// model class
const User = mongoose.model('users');

// set mondodb id as cookie
passport.serializeUser((user, done) => {
  // the user.id indecate mongodb internal id
  done(none, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById((id))
    .then(user => {
      done(null, user);
    })
})

passport.use(new GoogleStrategy({
  clientID: appKeys.googleClientID,
  clientSecret: appKeys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true,
}, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile.id: ', profile.id);

    console.log('profile: ', profile);
    User.findOne({googleID: profile.id}).then(existingUser => {
      if (existingUser) {
        // user already exist
        done(null, existingUser);
      } else {
        // create new record
        new User({
          googleID: profile.id,
        })
        .save()
        .then((err, user) => {
          done(null, user);
          console.log('err=====: ', err);
          console.log('product=====: ', product);
        })
      }
    })
}));
