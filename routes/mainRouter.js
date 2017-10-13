/**
 * Created by dell on 2017/10/11.
 */
var express = require('express');
var router = express.Router();
var User = require('../dbOperations/user');
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.redirect('/main/staff');
});
router.get('/logout', function(req, res, next) {
    req.logOut();
    req.session.user &= null;
    res.redirect('/');
});
router.get('/staff', ensureAuthenticated, function(req, res, next) {
    res.render('main', { UsersArr: [{username: "woaiwyhty", authority: "super admin", department: "admin"}],
        mainTitle: "Welcome to Dashboard", loginName: req.session.user.username, activeTab: "Staff"});
});
router.get('/storage', ensureAuthenticated, function(req, res, next) {
    res.render('main', { UsersArr: [{username: "woaiwyhty", authority: "super admin", department: "admin"}],
        mainTitle: "Welcome to Dashboard", loginName: req.session.user.username, activeTab: "Storage"});
});
function ensureAuthenticated(req, res, next){
    if(req.session.user){
        return next();
    }
    res.redirect('/login');
}
module.exports = router;