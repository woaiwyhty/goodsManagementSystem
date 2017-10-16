/**
 * Created by dell on 2017/10/12.
 */
var authArr = ['Super Administrator', 'Department Administrator', 'Employee'];
var productTypeArr = ['Rx', 'OTC'];
var dataParser = {
    getAuthority: function(numAuth) {
        if(numAuth < 1) return authArr[0];
        else if(numAuth < 2) return authArr[1];
        else return authArr[2];
    },
    getProductType: function(num) {
        if(num < 1) return productTypeArr[0];
        else return productTypeArr[1];
    }
};
module.exports = dataParser;