/**
 * Created by dell on 2017/10/11.
 */
var express = require('express');
var router = express.Router();
var User = require('../dbOperations/user');
var Department = require('../dbOperations/department');
var Storage = require('../dbOperations/storage');
var Supplier = require('../dbOperations/supplier');
var ProductCategory = require('../dbOperations/productinfo');
var Position = require('../dbOperations/position');
var Parser = require('../dbDataParser/parser');
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.redirect('/main/staff');
});
router.get('/logout', function(req, res, next) {
    req.logOut();
    req.session.user &= null;
    res.redirect('/');
});
router.get('/staff', ensureAuthenticated, function(req, res, next) {
    var renderData = {
        UsersArr: [], StorageArr: [],
        DivisionArr: [], ProductCategoryArr:[],
        selectedPrice: 0, PositionArr: [],
        mainTitle: "Welcome to Dashboard",
        CategoryArr: [],
        loginName: req.session.user.username, activeTab: "Staff"
    };
    User.getAllUsers(0, function(err, doc) {
        if(err) return next();
        for(var i in doc) {
            var obj = {
                username: doc[i].username,
                authority: Parser.getAuthority(doc[i].role),
                department: doc[i].department, idNumber: doc[i].idNumber
            };
            renderData.UsersArr.push(obj);
        }
        Department.getAllDepartments(function(err, doc) {
            if(err) return next();
            for(var i in doc) {
                var obj = {
                    name: doc[i].name, departmentAdminCnt: doc[i].departmentAdminCnt
                    , simpleEmployeeCnt: doc[i].simpleEmployeeCnt,
                    goodsCnt: doc[i].goodsCnt, idNumber: doc[i].idNumber
                };
                renderData.DivisionArr.push(obj);
            }

            res.render('main', renderData);
        });
    });

});
router.get('/storage', ensureAuthenticated, function(req, res, next) {
    var renderData = { UsersArr: [], StorageArr: [], DivisionArr: [], ProductCategoryArr:[],
        selectedPrice: 0, PositionArr:[], CategoryArr: [],
        mainTitle: "Welcome to Dashboard", loginName: req.session.user.username, activeTab: "Storage"};
    Storage.getAllStorage(function(err, doc) {
        if(err) return next();
        for(var i in doc) {
            var obj = { name: doc[i].name, supplierName: doc[i].supplierName
                , price: doc[i].price, quantity: doc[i].count,
                positionName: doc[i].positionName, idNumber: doc[i].idNumber };
            renderData.StorageArr.push(obj);
        }
        res.render('main', renderData);
    });

});


router.get('/division', ensureAuthenticated, function(req, res, next) {
    var renderData = { UsersArr: [], StorageArr: [], DivisionArr: [], ProductCategoryArr:[],
        selectedPrice: 0, PositionArr:[], CategoryArr: [],
        mainTitle: "Welcome to Dashboard", loginName: req.session.user.username, activeTab: "Division"};
    Department.getAllDepartments(function(err, doc) {
        if(err) return next();
        for(var i in doc) {
            var obj = { name: doc[i].name, departmentAdminCnt: doc[i].departmentAdminCnt
                , simpleEmployeeCnt: doc[i].simpleEmployeeCnt, goodsCnt: doc[i].goodsCnt, idNumber: doc[i].idNumber };
            renderData.DivisionArr.push(obj);
        }

        res.render('main', renderData);
    });
});

router.get('/position', ensureAuthenticated, function(req, res, next) {
    var renderData = { UsersArr: [], StorageArr: [], DivisionArr: [],
        ProductCategoryArr:[], selectedPrice: 0, PositionArr:[], CategoryArr: [],
        mainTitle: "Welcome to Dashboard",
        loginName: req.session.user.username, activeTab: "Position"};
    Position.getAllPosition(function(err, doc) {
        if(err) return next();
        for(var i in doc) {
            var obj = { name: doc[i].name, idNumber: doc[i].idNumber };
            renderData.PositionArr.push(obj);
        }

        res.render('main', renderData);
    });
});

router.get('/category', ensureAuthenticated, function(req, res, next) {
    var renderData = { UsersArr: [], StorageArr: [], DivisionArr: [],
        ProductCategoryArr:[], selectedPrice: 0, PositionArr:[], CategoryArr: [],
        mainTitle: "Welcome to Dashboard",
        loginName: req.session.user.username, activeTab: "Category"};
    ProductCategory.getAllProductCategory(function(err, doc) {
        if(err) return next();
        for(var i in doc) {
            var obj = {
                name: doc[i].name,
                idNumber: doc[i].idNumber,
                price: doc[i].price,
                productType: doc[i].productType,
                supplierName: doc[i].supplierName
            };
            renderData.PositionArr.push(obj);
        }

        res.render('main', renderData);
    });
});


function ensureAuthenticated(req, res, next){
    if(req.session.user){
        return next();
    }
    res.redirect('/login');
}
module.exports = router;