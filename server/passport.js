const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const helpers = require('./helpers');
const pool = require('./database');

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]); //3h:00m
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('Welcome ' + user.username));
        } else {
            done(null, false, req.flash('Incorrect Password'));
        }
     } else {
         return done(null, false, req.flash('The Username does not exists')); //3h:06m
     }
    password = await helpers.encryptPassword(password);
}));