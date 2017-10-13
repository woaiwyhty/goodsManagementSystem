/**
 * Created by dell on 2017/10/12.
 */
var authArr = ['Super Administrator', 'Department Administrator', 'Employee'];
var dataParser = {
    getAuthority: function(numAuth) {
        if(numAuth < 1) return authArr[0];
        else if(numAuth < 2) return authArr[1];
        else return authArr[2];
    }
};
module.exports = dataParser;