/**
 * Created by dell on 2017/10/13.
 */

var Department = {
    getAllDepartments: function(callback) {
        var model = global.dbHandle.getModel('department');
        //console.log(username);
        model.find({}, callback);
    },
    addDepartment: function(info, callback) {
        var model = global.dbHandle.getModel('department');
        model.create(info, callback);
    }
};

module.exports = User;