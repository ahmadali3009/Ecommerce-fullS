import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { featchorderbyuseridaAync, selectuserorder } from '../userSlice'
import { selectcheckuser } from '../../auth/authSlice'

const Userorder = () => {
    let dispatch =  useDispatch()
    let user = useSelector(selectcheckuser)
    let userorder = useSelector(selectuserorder)
    console.log("userorder" , userorder)
    console.log("user" , user)

    useEffect(()=>{
      if (user?.id) {
        dispatch(featchorderbyuseridaAync(user.id))
      }
    },[])
  return (
    <div>
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
    <div className="space-y-4">
        {/* Ensure `userorder.response` is an object and has the `products` property */}
        {userorder && userorder.response && Array.isArray(userorder.response.products) && userorder.response.products.length > 0 ? (
            <div key={userorder.response.id} className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Order Number: {userorder.response.id}</h2>
                <div className="mb-4">
                    {userorder.response.products.map((product, idx) => (
                        <div key={idx} className="flex mb-4 last:mb-0">
                            <img
                                className="w-24 h-24 object-cover rounded-md"
                                src={product.thumbnail} // Adjust as needed
                                alt={product.title} // Adjust as needed
                            />
                            <div className="ml-4 flex flex-col justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{product.title}</p>
                                    <p className="text-sm text-gray-600">{product.brand}</p>
                                </div>
                                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-900">Total Amount: ${userorder.response.totalAmount}</p>
                    <p className="text-sm text-gray-600">Payment Method: {userorder.response.paymentMethod}</p>
                </div>
            </div>
        ) : (
            <p>No orders found.</p>
        )}
    </div>
</div>

        order
    </div>
  )
}

export default Userorder
