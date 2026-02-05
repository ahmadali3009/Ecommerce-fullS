import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartaync, selectcart, updateCartaync } from "./cartslice"

const Cart = () => {
    const dispatch = useDispatch();
    const cartproduct = useSelector(selectcart) || [];

    const handlequnatity = (e, cartID) => {
        if (cartproduct.length === 0) return;
        dispatch(updateCartaync({ id: cartID, quantity: +e.target.value, user: cartproduct[0].user }));
    };

    const handledelete = (_e, productid) => {
        dispatch(deleteCartaync(productid));
    };

    const subtotal = cartproduct.reduce((amount, cartItem) => {
        const price = cartItem.product?.price ?? 0;
        return Number(price) * (cartItem.quantity ?? 0) + amount;
    }, 0);

    return (
        <div>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

                {cartproduct.length === 0 ? (
                    <div className="mt-12 text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-lg text-gray-600">Your cart is empty.</p>
                        <p className="mt-2 text-sm text-gray-500">Add items from the shop to get started.</p>
                        <Link
                            to="/"
                            className="mt-6 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cartproduct.map((cartItem) => {
                                        const product = cartItem.product || {};
                                        const productId = product.id ?? product._id ?? cartItem.product;
                                        const title = product.title ?? 'Product';
                                        const thumbnail = product.thumbnail ?? '';
                                        const price = Number(product.price ?? 0);
                                        const category = product.category ?? '';
                                        return (
                                        <li key={cartItem.id} className="flex py-6">
                                            <Link to={productId ? `/productdetail/${productId}` : '#'} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                                {thumbnail ? (
                                                    <img
                                                        src={thumbnail}
                                                        alt={title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No image</div>
                                                )}
                                            </Link>
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <Link to={productId ? `/productdetail/${productId}` : '#'} className="hover:underline text-gray-900">
                                                                {title}
                                                            </Link>
                                                        </h3>
                                                        <p className="ml-4">${price.toFixed(2)}</p>
                                                    </div>
                                                    {category && <p className="mt-1 text-sm text-gray-500">{category}</p>}
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm mb-5">
                                                    <div className="text-gray-600">
                                                        <label htmlFor={`quantity-${cartItem.id}`} className="inline text-sm font-medium leading-6 text-gray-900">
                                                            Qty
                                                        </label>
                                                        <select id={`quantity-${cartItem.id}`} onChange={(e) => handlequnatity(e, cartItem.id)} value={cartItem.quantity} className="ml-3 rounded border border-gray-300">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>
                                                    <button onClick={(e) => handledelete(e, cartItem.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${subtotal.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <Link
                                    to="/checkout"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Checkout
                                </Link>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default Cart
