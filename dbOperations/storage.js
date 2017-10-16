/**
 * Created by dell on 2017/10/13.
 */
var dbHandle = require("../dbModels/dbHandles");
var model = dbHandle.getModel('productsStocks');
var ids = dbHandle.getModel('ids');
var Storage = {
    getAllStorage: function(callback) {
        //console.log(username);
        model.find({}, callback);
    },
    addStorage: function(info, callback) {
        model.create(info, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'productsStocks'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    }
};

module.exports = Storage;