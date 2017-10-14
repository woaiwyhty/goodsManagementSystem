/**
 * Created by dell on 2017/10/13.
 */
var dbHandle = require("../dbModels/dbHandles");
var model = dbHandle.getModel('departments');
var ids = dbHandle.getModel('ids');
var Department = {
    getAllDepartments: function(callback) {
        //console.log(username);
        model.find({}, callback);
    },
    addDepartment: function(info, callback) {
        model.create(info, callback);
    },
    idNumberInc: function(callback) {
        ids.findOneAndUpdate({name: 'departments'}, {$inc: {idNumber: 1}}, {new: true}, callback);
    }
};

module.exports = Department;