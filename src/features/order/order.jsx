import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetOrder, selectorder } from './orderSlice';
import { selectcheckuser } from '../auth/authSlice';
import { resetCartaync } from '../cart/cartslice';
const Order = () => {
  let order = useSelector(selectorder)
  console.log("order", order)
  let dispatch = useDispatch()
  let user = useSelector(selectcheckuser)
  useEffect(()=>
    {
      dispatch(resetCartaync(user.id))
      dispatch(resetOrder())
    }, [dispatch , user])
  return (
    <>
    {order && <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
        <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Order Confirmed!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Thank you for your purchase. Your order has been placed successfully.
            </p>
        </div>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                Order Details
            </h3>
            <div className="mt-6 text-sm text-gray-600">
                <p><strong>Order Number:</strong> #{order?.id}</p>
                <p><strong>Order Date:</strong> {order?.date}</p>
                <p><strong>Payment Method:</strong>{order?.paymentway} </p>
            </div>
            <div className="mt-6">
                <Link
                    to="/"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    </div>
</div>}
</>
  )
}

export default Order