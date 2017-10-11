/**
 * Created by dell on 2017/10/11.
 */
var express = require('express');
var router = express.Router();
var User = require('../dbOperations/user');
router.get('/logout', function(req, res, next) {
    req.logOut();
    req.session.user &= null;
    res.redirect('/');
});

module.exports = router;