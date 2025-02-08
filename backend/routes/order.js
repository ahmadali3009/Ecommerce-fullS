const express = require('express');
const { handleOrderdata , handlefetchuserorderbyid , handleshoworder } = require('../controller/order');

const orderrouter = express.Router();
//  /products is already added in base path
orderrouter.post('/order/', handleOrderdata)
orderrouter.get('/order/:id', handlefetchuserorderbyid)
// orderrouter.get('/order-success/:id', handleshoworder)


module.exports = {orderrouter}