var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../dbOperations/user');
var LocalStrategy = require('passport-local').Strategy;
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Goods Management System' });
    res.redirect('/login');
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login'});
});
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/', failureFlash: "Invalid username or passport" }),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        //req.flash("Log in successful");
        res.redirect('/index');
    }
);

passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserNameByName(username, function(err, doc) {
        if(err) throw err;
        if(!doc) {
            console.log('error');
            return done(null, false, { message: "Unknown username" });
        }
        if(User.comparePassword(password, doc.password)) {
            return done(null, doc);
        }
        return done(null, false, { message: "Incorrect password" });
    })
}))
module.exports = router;
