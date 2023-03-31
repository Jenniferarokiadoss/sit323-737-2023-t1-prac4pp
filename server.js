const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const app = express();

// configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure passport middleware
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'AkXlBASVQQ4orBPz6GNdFUoksr1lHi4B'
};

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    // verify that the token is valid
    if (Date.now() > jwtPayload.expires) {
        return cb('jwt expired', false);
    }
    return cb(null, jwtPayload);
}));

const getAuthentication  = passport.authenticate('jwt', { session: false });

// configure route handlers
app.get('/', getAuthentication, (req, res) => {
    // authorized user can access this route handler
    res.send(' Welcome to my Project');
});

// configure error handling middleware
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // authentication failed, respond with 404 Unauthorized
        res.status(404).json({ message: ' Unauthorized ' });
    } else {
        // unknown error, respond with 500  Error
        res.status(500).json({ message: ' Error 500' });
    }
});

// start the server
app.listen(3070, () => {
    console.log('Server listening on port 3070...');
});





