/**
 * Created by dell on 2017/10/14.
 */
var dbHandle = require("../dbModels/dbHandles");
var model = dbHandle.getModel('positions');
var ids = dbHandle.getModel('ids');
var Position = {
    getAllPosition: function(callback) {
        //console.log(username);
        model.find({}, callback);
    },
    addPosition: function(info, callback) {
        model.create(info, callback);
    },
    removePositionById: function(idNumber, callback) {
        model.remove({idNumber: idNumber}, callback);
    },
    removePositionByName: function(name, callback) {
        model.remove({name: name}, callback);
    },
    getIdByName: function(name, callback) {
        model.find({name: name}, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'positions'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    }
};

module.exports = Position;