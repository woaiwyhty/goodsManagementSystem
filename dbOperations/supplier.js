/**
 * Created by dell on 2017/10/14.
 */
var dbHandle = require("../dbModels/dbHandles");
var model = dbHandle.getModel('suppliers');
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
    }

};

module.exports = Supplier;