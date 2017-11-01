/**
 * Created by dell on 2017/10/14.
 */
var dbHandle = require("../dbModels/dbHandles");
var model = dbHandle.getModel('suppliers');
var ids = dbHandle.getModel('ids');
var Supplier = {
    getAllSupplier: function(callback) {
        //console.log(username);
        model.find({}, callback);
    },
    addSupplier: function(info, callback) {
        model.create(info, callback);
    },
    removeSupplier: function(con, callback) {
        model.remove({ name: con.name, phone: con.phone, addr: con.addr, postCode: con.postCode }, callback);
    },
    getIdByName: function(name, callback) {
        model.find({name: name}, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'suppliers'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    }
};

module.exports = Supplier;