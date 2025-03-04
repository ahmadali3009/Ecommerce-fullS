import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { selectAllorder } from '../features/admin/adminDashboard/AdminOrderStatus/AdorderSSlice';

const AdminTincomeC = () => {
  const orders = useSelector(selectAllorder);
  console.log('orders', orders);

  // Calculate total income
  const totalIncome = orders.response.reduce((acc, order) => acc + parseFloat(order.totalAmount), 0);
  console.log('Total Income:', totalIncome);

  // Group data by date
  const groupedData = orders.response.reduce((acc, order) => {
    const date = order.createdAt ? order.createdAt.split('T')[0] : 'Unknown Date';
    const amount = parseFloat(order.totalAmount);
    if (!acc[date]) {
      acc[date] = { date, amount };
    } else {
      acc[date].amount += amount;
    }
    return acc;
  }, {});

  // Convert grouped data to array
  const chartData = Object.values(groupedData);

  return (
    <div>
      <h1>TOTAL INCOME CHART</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminTincomeC;