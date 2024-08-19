import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { featchorderbyuseridaAync, selectuserorder } from '../userSlice'
import { selectcheckuser } from '../../auth/authSlice'

const Userorder = () => {
    let dispatch =  useDispatch()
    let user = useSelector(selectcheckuser)
    let userorder = useSelector(selectuserorder)
    console.log("userorder" , userorder)
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
                {userorder.map((order, index) => (
                    <div key={index} className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Order Number: {order.id}</h2>
                        <div className="mb-4">
                            {order.productlist.map((product, idx) => (
                                <div key={idx} className="flex mb-4 last:mb-0">
                                    <img
                                        className="w-24 h-24 object-cover rounded-md"
                                        src={product.thumbnail}
                                        alt={product.title}
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
                            <p className="text-sm font-semibold text-gray-900">Total Amount: ${order.totalprice}</p>
                            <p className="text-sm text-gray-600">Payment Method: {order.paymentway}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Userorder
