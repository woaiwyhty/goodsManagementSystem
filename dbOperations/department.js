/**
 * Created by dell on 2017/10/13.
 */

var Department = {
    getAllDepartments: function(callback) {
        var model = global.dbHandle.getModel('departments');
        //console.log(username);
        model.find({}, callback);
    },
    addDepartment: function(info, callback) {
        var model = global.dbHandle.getModel('departments');
        model.create(info, callback);
    }
};

module.exports = Department;