import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartaync, selectcart, updateCartaync } from '../features/cart/cartslice';
import { useForm } from 'react-hook-form';
import { createorderaync, selectorder } from '../features/order/orderSlice';
import { selectuserinfo, updateUseraync } from '../features/user/userSlice';
import { selectcheckuser } from '../features/auth/authSlice';

const Cheakout = () => {
  const cartproduct = useSelector(selectcart) || [];
  const user = useSelector(selectuserinfo);
  const authUser = useSelector(selectcheckuser);
  const currentOrder = useSelector(selectorder);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [paymentmethod, setpaymentmethod] = useState('');

  const totalamount = (items) => {
    return items.reduce(
      (amount, item) => Number(item.product?.price ?? 0) * (item.quantity ?? 0) + amount,
      0
    );
  };

  const handlequnatity = (e, productID) => {
    if (cartproduct.length === 0) return;
    dispatch(updateCartaync({
      id: productID,
      quantity: +e.target.value,
      user: cartproduct[0].user,
    }));
  };

  const handledelete = (_e, productid) => {
    dispatch(deleteCartaync(productid));
  };

  const handlepayment = (e) => {
    setpaymentmethod(e.target.id);
  };

  const handleOrder = () => {
    const orderdata = {
      products: cartproduct,
      totalAmount: totalamount(cartproduct).toFixed(2),
      user: user?.id ?? authUser?.id,
      paymentMethod: paymentmethod,
      status: 'pending',
      selectedAddress: user?.addresses || [],
    };
    dispatch(createorderaync(orderdata));
  };

  const onSaveAddress = (data) => {
    dispatch(updateUseraync({
      ...user,
      addresses: [...(user?.addresses || []), data],
    }));
    reset();
  };

  const subtotal = totalamount(cartproduct);

  if (cartproduct.length === 0) {
    return <Navigate to="/" replace />;
  }

  if (currentOrder?.response?.paymentMethod === 'COD') {
    return <Navigate to="/orderpage" replace />;
  }
  if (currentOrder?.response?.paymentMethod === 'COC') {
    return <Navigate to="/stripe-checkout" replace />;
  }

  const inputClass = 'block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left: Shipping & payment */}
          <div className="lg:col-span-3 space-y-8">
            {/* Personal info / new address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Shipping address</h2>
                <p className="mt-1 text-sm text-gray-500">Add or use a saved address for delivery.</p>
              </div>
              <form noValidate onSubmit={handleSubmit(onSaveAddress)} className="px-6 py-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <input
                      type="text"
                      {...register('fullname', { required: 'Please enter your full name' })}
                      id="fullname"
                      className={`mt-1.5 ${inputClass}`}
                      placeholder="John Doe"
                    />
                    {errors.fullname && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullname.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      {...register('email', { required: 'Please enter a valid email' })}
                      type="email"
                      className={`mt-1.5 ${inputClass}`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      id="tel"
                      {...register('tel', { required: 'Please enter a phone number' })}
                      type="tel"
                      className={`mt-1.5 ${inputClass}`}
                      placeholder="+1 234 567 8900"
                    />
                    {errors.tel && (
                      <p className="mt-1 text-sm text-red-600">{errors.tel.message}</p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                      Street address
                    </label>
                    <input
                      type="text"
                      {...register('street', { required: 'Please enter street address' })}
                      id="street"
                      className={`mt-1.5 ${inputClass}`}
                      placeholder="123 Main St"
                    />
                    {errors.street && (
                      <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: 'Please enter city' })}
                      id="city"
                      className={`mt-1.5 ${inputClass}`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <input
                      type="text"
                      {...register('region', { required: 'Please enter state or province' })}
                      id="region"
                      className={`mt-1.5 ${inputClass}`}
                      placeholder="NY"
                    />
                    {errors.region && (
                      <p className="mt-1 text-sm text-red-600">{errors.region.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="postal" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      {...register('postal', { required: 'Please enter postal code' })}
                      id="postal"
                      className={`mt-1.5 ${inputClass}`}
                      placeholder="10001"
                    />
                    {errors.postal && (
                      <p className="mt-1 text-sm text-red-600">{errors.postal.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save address
                  </button>
                </div>
              </form>
            </div>

            {/* Saved addresses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Saved addresses</h2>
                <p className="mt-1 text-sm text-gray-500">Delivery will be made to your selected address.</p>
              </div>
              <div className="px-6 py-4">
                {user?.addresses?.length > 0 ? (
                  <ul role="list" className="space-y-4">
                    {user.addresses.map((address, idx) => (
                      <li
                        key={`${address?.email}-${idx}`}
                        className="rounded-lg border border-gray-200 bg-gray-50/50 p-4"
                      >
                        <p className="font-medium text-gray-900">{address.fullname}</p>
                        <p className="mt-0.5 text-sm text-gray-500">{address.email}</p>
                        <p className="mt-1 text-sm text-gray-600">
                          {address.street}, {address.city}, {address.region} {address.postal}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No saved addresses yet. Add one above.</p>
                )}
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Payment method</h2>
                <p className="mt-1 text-sm text-gray-500">Choose how you want to pay.</p>
              </div>
              <div className="px-6 py-6">
                <fieldset className="space-y-4">
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                      paymentmethod === 'COD'
                        ? 'border-indigo-500 bg-indigo-50/50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      id="COD"
                      name="Payments"
                      type="radio"
                      checked={paymentmethod === 'COD'}
                      onChange={handlepayment}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="block font-medium text-gray-900">Cash on Delivery</span>
                      <span className="block text-sm text-gray-500">Pay when your order is delivered</span>
                    </div>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                      paymentmethod === 'COC'
                        ? 'border-indigo-500 bg-indigo-50/50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      id="COC"
                      name="Payments"
                      type="radio"
                      checked={paymentmethod === 'COC'}
                      onChange={handlepayment}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="block font-medium text-gray-900">Card (Stripe)</span>
                      <span className="block text-sm text-gray-500">Pay securely with card</span>
                    </div>
                  </label>
                </fieldset>
              </div>
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
              </div>
              <div className="px-6 py-4">
                <ul role="list" className="divide-y divide-gray-200">
                  {cartproduct.map((item) => {
                    const product = item.product || {};
                    const productId = product.id ?? product._id ?? product;
                    const title = product.title ?? 'Product';
                    const thumbnail = product.thumbnail ?? '';
                    const price = Number(product.price ?? 0);
                    return (
                    <li key={item.id} className="flex gap-4 py-4 first:pt-0">
                      <Link
                        to={productId ? `/productdetail/${productId}` : '#'}
                        className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
                      >
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">—</div>
                        )}
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={productId ? `/productdetail/${productId}` : '#'}
                          className="font-medium text-gray-900 hover:text-indigo-600 line-clamp-2"
                        >
                          {title}
                        </Link>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Qty: {item.quantity} × ${price.toFixed(2)}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <select
                            value={item.quantity}
                            onChange={(e) => handlequnatity(e, item.id)}
                            className="rounded border border-gray-300 text-sm py-1 px-2"
                          >
                            {[1, 2, 3, 4, 5].map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={(e) => handledelete(e, item.id)}
                            className="text-sm font-medium text-red-600 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right text-sm font-medium text-gray-900">
                        ${(price * (item.quantity ?? 0)).toFixed(2)}
                      </div>
                    </li>
                    );
                  })}
                </ul>
              </div>
              <div className="border-t border-gray-200 px-6 py-5">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500">Shipping calculated at next step if applicable.</p>
                <button
                  type="button"
                  onClick={handleOrder}
                  disabled={!paymentmethod}
                  className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {paymentmethod === 'COC' ? 'Continue to payment' : 'Place order'}
                </button>
                {!paymentmethod && (
                  <p className="mt-2 text-center text-sm text-amber-600">Please select a payment method above.</p>
                )}
                <p className="mt-4 text-center text-sm text-gray-500">
                  or{' '}
                  <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue shopping →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cheakout;
