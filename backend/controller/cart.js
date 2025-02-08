const  Cart  = require('../model/cart');

async function fetchCartByUser(req, res) {
  const { id } = req.user;
  try {
    const cartItems = await Cart.find({ user: id }).populate('product');
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function addToCart(req, res) {
  const {id} = req.user;
  const cart = new Cart({...req.body,user:id});
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
  console.log("req.body in cart update", req.body);
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('product');
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
