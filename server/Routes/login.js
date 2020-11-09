const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('/login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/article',
        failureRedirect: '/login',
        failureFlash: true,
        })(req, res, next);
    });

module.exports = router;
