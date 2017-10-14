/**
 * Created by dell on 2017/9/6.
 */
module.exports = {
    users: {
        username: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: Number},// 0 means super admin, 1 means department admin, 2 means simple admin
        department: {type: String}
    },
    departments: {
        name: {type: String},
        departmentAdminCnt: {type: Number},
        simpleEmployeeCnt:  {type: Number},
        goodsCnt: {type: Number}

    },
    suppliers: {
        name: {type: String},
        phone: {type: String},
        addr: {type: String},
        postCode: {type: String},
        supplyProductId: {type: String},
        supplierId: {type: Number}
    },
    productsStocks:  {
        name: {type: String},
        supplierId: {type: Number},
        productId: {type: Number},
        positionId: {type: Number},
        count: {type: Number},
        stockData: {type: Date},
        stockId: {type: Number}
    },
    productInformations: {
        name: {type: String},
        productId: {type: Number},
        price: {type:  Number},
        productType: {type: String}
    }
};