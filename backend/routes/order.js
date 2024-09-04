const express = require('express');
const { handleOrderdata } = require('../controller/order');

const orderrouter = express.Router();
//  /products is already added in base path
orderrouter.post('/', handleOrderdata)
     

module.exports = {orderrouter}