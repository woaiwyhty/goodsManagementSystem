/**
 * Created by dell on 2017/9/6.
 */
module.exports = {
    users: {
        username: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: Number},
        department: {type: Number}
    },
};