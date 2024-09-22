const express = require('express');
const { handleOrderdata , handlefetchuserorderbyid , handleshoworder } = require('../controller/order');

const orderrouter = express.Router();
//  /products is already added in base path
orderrouter.post('/', handleOrderdata)
orderrouter.get('/own/', handlefetchuserorderbyid)
orderrouter.get('/', handleshoworder)


module.exports = {orderrouter}