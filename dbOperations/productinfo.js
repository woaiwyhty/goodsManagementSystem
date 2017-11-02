/**
 * Created by dell on 2017/10/14.
 */
var dbHandle = require("../dbModels/dbHandles");
var model = dbHandle.getModel('productInformations');
var ids = dbHandle.getModel('ids');
var ProductCategory = {
    getAllProductCategory: function(callback) {
        //console.log(username);
        model.find({}, callback);
    },
    addProductCategory: function(info, callback) {
        model.create(info, callback);
    },
    removeCategoryById: function(idNumber, callback) {
        model.removeOne({idNumber: idNumber}, callback);
    },
    getIdByIdNumber: function(idNumber, callback) {
        model.findOne({idNumber: idNumber}, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'productInformations'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    }
};

module.exports = ProductCategory;