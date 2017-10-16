/**
 * Created by dell on 2017/9/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
    users: {
        username: {type: String, required: true, index: 1, unique: true},
        password: {type: String, required: true},
        role: {type: Number},// 0 means super admin, 1 means department admin, 2 means simple admin
        department: {type: String},
        idNumber: {type: Number},
        departmentId: {type: Schema.Types.ObjectId, ref: 'departments'}
    },
    departments: {
        name: {type: String, required: true, index: 1, unique: true},
        departmentAdminCnt: {type: Number},
        simpleEmployeeCnt:  {type: Number},
        goodsCnt: {type: Number},
        idNumber: {type: Number}
    },
    suppliers: {
        name: {type: String, required: true, index: 1, unique: true},
        phone: {type: String},
        addr: {type: String},
        postCode: {type: String},
        idNumber: {type: Number}
    },
    productsStocks:  {
        name: {type: String, required: true, index: 1},
        productId: {type: Schema.Types.ObjectId, ref: 'productinformations'},
        positionId: {type: Schema.Types.ObjectId, ref: 'positions'},
        supplierName: {type: String},
        supplierId: {type: Schema.Types.ObjectId, ref: 'suppliers'},
        price: {type: Number},
        positionName: {type: String},
        count: {type: Number},
        stockDate: {type: Date},
        idNumber: {type: Number}
    },
    productInformations: {
        name: {type: String, required:true, index: 1},
        price: {type:  Number},
        productType: {type: String},
        supplierId: {type: Schema.Types.ObjectId, ref: 'suppliers'},
        idNumber: {type: Number}
    },
    ids: {
        name: {type: String, required: true, unique: true},
        idNumber: {type: Number, required: true}
    },
    positions: {
        name: {type: String, required:true, index: 1},
        idNumber: {type: Number}
    }
};