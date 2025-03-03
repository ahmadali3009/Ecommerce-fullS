import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectcheckuser } from '../../../auth/authSlice';
import { fectchAllOrderStatusasync, selectAllorder } from './AdorderSSlice';
const Adminorderstatus = () => {
    let dispach = useDispatch()
    let user = useSelector(selectcheckuser)
    console.log("adminorderstaus" , user)
  // useEffect(() => {
  //   if(user){
  //   dispach(fectchAllOrderStatusasync())
  //   }
  // }, [dispach, user])




  // Sample data for demonstration purposes
    let orders = useSelector(selectAllorder)
    console.log("orders", orders)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Status</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Order Number</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Total Amount</th>
              <th className="px-4 py-2 border-b">Payment Method</th>

            </tr>
          </thead>
          <tbody>
            {orders ? orders?.response.map((order, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{order.id}</td>
                <td className="px-4 py-2 border-b">{order.createdAt}</td>
                <td className="px-4 py-2 border-b">{order.status}</td>
                <td className="px-4 py-2 border-b">{order.totalAmount}</td>
                <td className="px-4 py-2 border-b">{order.paymentMethod}</td>

              </tr>
            )) : "order null"  }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminorderstatus;