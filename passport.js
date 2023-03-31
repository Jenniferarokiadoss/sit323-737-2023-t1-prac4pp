const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'AkXlBASVQQ4orBPz6GNdFUoksr1lHi4B'
};

  const jwtCallback = (jwtPayload, done) => {
    // Using the ID from the JWT, locate the user in the database.
    User.searchId(jwtPayload.id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
};

const strategy = new JwtStrategy(jwtOptions, jwtCallback);
passport.use(strategy);  
module.exports = passport;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Authenticated!' });
  });