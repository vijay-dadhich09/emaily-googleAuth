const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// model class
const User = mongoose.model('users');

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile.id: ', profile.id);

    console.log('profile: ', profile);
    // create new record
    new User({
      googleID: profile.id,
    })
    .save()
    .then((err, product) => {
      console.log('err=====: ', err);
      console.log('product=====: ', product);
    })
}));
