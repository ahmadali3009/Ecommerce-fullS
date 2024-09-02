const express = require('express');
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controller/cart');

const cartrouter = express.Router();
//  /products is already added in base path
cartrouter.post('/', addToCart)
      .get('/', fetchCartByUser)
      .delete('/:id', deleteFromCart)
      .patch('/:id', updateCart)

module.exports = {cartrouter}