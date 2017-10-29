var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../dbOperations/user');
var Department = require('../dbOperations/department');
var Storage = require('../dbOperations/storage');
var Supplier = require('../dbOperations/supplier');
var ProductCategory = require('../dbOperations/productinfo');
var Position = require('../dbOperations/position');
var Parser = require('../dbDataParser/parser');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  //res.render('index', { title: 'Goods Management System' });
    res.redirect('/main');
});
function ensureAuthenticated(req, res, next){
    if(req.session.user){
        return next();
    }
    res.redirect('/login');
}
function ensureAuthenticatedInLogin(req, res, next) {
    if(!req.session.user) {
        return next();
    }
    res.redirect('/main');
}
router.get('/login', ensureAuthenticatedInLogin, function(req, res, next) {
    res.render('login', { title: 'Login'});
});


router.post('/login',
    passport.authenticate('local',
        { failureRedirect: '/', failureFlash: "Invalid username or passport"}),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        //req.flash("Log in successful");
        //res.redirect('/main');
        req.session.user = req.user || null;
        res.redirect('/main');
    }
);
router.post('/removeUser', ensureAuthenticated, function(req, res, next) {
    User.removeUserByName(req.body.username, function(err, doc) {
        if(err) return next();
        res.status(200);
        res.send({retCode: 0});
    });
});

router.post('/newUser', ensureAuthenticated, function(req, res, next) {
    User.idNumberInc(function(err, doc) {
        if(err) return next();
        var info = { username: req.body.username, password: req.body.password,
            role: req.body.role, department: req.body.department, idNumber: doc.idNumber};
        Department.getIdByName(req.body.department, function(err, doc) {
            if(err) return next();
            info.departmentId = doc._id;
            User.addUser(info, function(err, doc) {
                if(err) return next();
                res.status(200);
                res.send({retCode: 0});
            });
        });

    });
});

router.post('/newDivision', ensureAuthenticated, function(req, res, next) {
    Department.idNumberInc(function(err, doc) {
        if(err) return next();
        var info = {
            name: req.body.name,
            departmentAdminCnt: 0,
            simpleEmployeeCnt: 0,
            goodsCnt: 0,
            idNumber: doc.idNumber
        };
        Department.addDepartment(info, function(err, doc) {
            if(err) return next();
            res.status(200);
            res.send({retCode: 0});
        });
    });

});

router.post('/newSupplier', ensureAuthenticated, function(req, res, next) {
    Supplier.idNumberInc(function(err, doc) {
        if(err) return next();
        var info = {
            name: req.body.name,
            phone: req.body.phone,
            addr: req.body.addr,
            postCode: req.body.postCode,
            idNumber: doc.idNumber
        };
        Supplier.addSupplier(info, function(err, doc) {
            if(err) return next();
            res.status(200);
            res.send({retCode: 0});
        });
    });

});

router.post('/newPosition', ensureAuthenticated, function(req, res, next) {
    Position.idNumberInc(function(err, doc) {
        if(err) return next();
        var info = {
            name: req.body.name,
            idNumber: doc.idNumber
        };
        Position.addPosition(info, function(err, doc) {
            if(err) return next();
            res.status(200);
            res.send({retCode: 0});
        });
    });

});

router.post('/newProduct', ensureAuthenticated, function(req, res, next) {
    ProductCategory.idNumberInc(function(err, doc) {
        if(err) return next();
        var info = {
            name: req.body.name,
            price: req.body.price,
            productType: Parser.getProductType(req.body.productType),
            supplierId: null,
            idNumber: doc.idNumber
        };
        Supplier.getIdByName(req.body.supplierName, function(err, doc) {
            if(err) return next();
            info.supplierId = doc._id;
            Supplier.addSupplier(info, function(err, doc)  {
                if(err) return next();
                res.status(200);
                res.send({retCode: 0});
            })
        });
    });

});

router.post('/newStock', ensureAuthenticated, function(req, res, next) {
    Storage.idNumberInc(function(err, doc) {
        if(err) return next();
        var info = {
            name: req.body.name,
            productId: null,
            positionId: null,
            price: req.body.price,
            positionName: req.body.positionName,
            count: req.body.count,
            stockDate: new Date().now(),
            idNumber: doc.idNumber
        };
        ProductCategory.getIdByIdNumber(req.body.idNumber.product, function(err, doc) {
            if(err) return next();
            info.productId = doc._id;
            Position.getIdByIdNumber(req.body.idNumber.position, function(err, doc) {
                if(err) return next();
                info.positionId = doc._id;
                Storage.addStorage(info, function(err, doc) {
                    if(err) return next();
                    res.status(200);
                    res.send({retCode: 0});
                });
            });
        });
    });

});

router.get('/getSupplierList', ensureAuthenticated, function(req, res, next) {
    var returnData = [];
    Supplier.getAllSupplier(function(err, doc) {
        if(err) return next();
        for(var i in doc) {
            var obj = { name: doc[i].name, phone: doc[i].phone
                , addr: doc[i].addr, postCode: doc[i].postCode, idNumber: doc[i].idNumber };
            returnData.push(obj);
        }
        res.send({retCode: 0, infoArr: returnData});
    })
});
router.get('/getPositionList', ensureAuthenticated, function(req, res, next) {
    var returnData = [];
    Position.getAllPosition(function(err, doc) {
        if(err) return next();
        for(var i in doc) {
            var obj = { name: doc[i].name, idNumber: doc[i].idNumber };
            returnData.push(obj);
        }
        res.send({retCode: 0, infoArr: returnData});
    })
});

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
