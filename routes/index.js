var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../dbOperations/user');
var LocalStrategy = require('passport-local').Strategy;
/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  //res.render('index', { title: 'Goods Management System' });
    res.render('main');
});
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login'});
});
router.get('/main', function(req, res, next) {
   res.render('main');
});
router.post('/login',
    passport.authenticate('local',
        { failureRedirect: '/', failureFlash: "Invalid username or passport",  successRedirect: '/main' }),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        //req.flash("Log in successful");
        res.redirect('/main');
    }
);

passport.serializeUser(function(user, done) {
    done(null, user.id); //store login status
});

passport.deserializeUser(function(id, done) {
    User.getUserIDbyID(id, function(err, doc) {
       done(null, doc);
    });
});

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
}));
module.exports = router;
