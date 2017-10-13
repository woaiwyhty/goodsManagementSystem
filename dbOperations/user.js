/**
 * Created by dell on 2017/10/8.
 */
var User = {
    getUserNameByName: function(username, callback) {
        var userModel = global.dbHandle.getModel('users');
        //console.log(username);
        userModel.findOne({username: username}, callback);
    },
    comparePassword: function(pwd, pwd1) {
        return pwd == pwd1;
    },
    getUserIDbyID: function(id, callback) {
        var userModel = global.dbHandle.getModel('users');
        userModel.findOne({id: id}, callback);
    },
    getAllUsers: function(roles, callback) {
        var userModel = global.dbHandle.getModel('users');
        var queryStr;
        if(typeof(roles) == undefined) queryStr = {};
        else {
            queryStr = { role : { $gte : roles}};
        }
        userModel.find(queryStr, callback);
    }
};

module.exports = User;