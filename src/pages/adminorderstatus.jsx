import React from 'react';

const Adminorderstatus = () => {
  // Sample data for demonstration purposes
  const orders = [
    { orderNumber: '001', date: '2025-02-28', status: 'Shipped', totalAmount: '$100.00' },
    { orderNumber: '002', date: '2025-02-27', status: 'Processing', totalAmount: '$150.00' },
    { orderNumber: '003', date: '2025-02-26', status: 'Delivered', totalAmount: '$200.00' },
  ];

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
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{order.orderNumber}</td>
                <td className="px-4 py-2 border-b">{order.date}</td>
                <td className="px-4 py-2 border-b">{order.status}</td>
                <td className="px-4 py-2 border-b">{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminorderstatus;