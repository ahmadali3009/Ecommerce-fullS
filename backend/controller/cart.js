const  Cart  = require('../model/cart');

async function fetchCartByUser(req, res) {
  const { user } = req.query;
  try {
    const cartItems = await Cart.find({ user: user }).populate('product');
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function addToCart(req, res) {
  const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate('product');
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteFromCart(req, res) {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function updateCart(req, res) {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Export all the functions at the end
module.exports = {
  fetchCartByUser,
  addToCart,
  deleteFromCart,
  updateCart,
};
