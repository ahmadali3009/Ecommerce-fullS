const Cart = require('../model/cart');

// Ensure cart item has product with id and full details for frontend (handles Mongoose doc or plain object)
function normalizeCartItem(item) {
  if (!item) return item;
  const plain = item.toObject ? item.toObject({ virtuals: true }) : { ...item };
  if (plain.product && typeof plain.product === 'object') {
    const p = plain.product.toObject ? plain.product.toObject({ virtuals: true }) : plain.product;
    plain.product = {
      id: p.id || p._id?.toString?.() || p._id,
      title: p.title,
      description: p.description,
      brand: p.brand,
      price: p.price,
      discountPercentage: p.discountPercentage,
      category: p.category,
      thumbnail: p.thumbnail,
      images: p.images,
      stock: p.stock,
      deleted: p.deleted,
    };
  }
  if (!plain.id && plain._id) plain.id = plain._id.toString?.() || plain._id;
  return plain;
}

async function fetchCartByUser(req, res) {
  const { id } = req.user;
  try {
    const cartItems = await Cart.find({ user: id }).populate('product');
    const normalized = cartItems.map(normalizeCartItem);
    res.status(200).json(normalized);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function addToCart(req, res) {
  const { id } = req.user;
  const cart = new Cart({ ...req.body, user: id });
  try {
    const doc = await cart.save();
    const populated = await doc.populate('product');
    const result = normalizeCartItem(populated);
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
    }).populate('product');
    const result = normalizeCartItem(cart);
    res.status(200).json(result);
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
