import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
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


  const groupedDatayearly = orders.response.reduce((acc, order) => {
    const year = order.createdAt ? order.createdAt.split('-')[0] : null;
    if (year) {
      const amount = parseFloat(order.totalAmount);
      if (!acc[year]) {
        acc[year] = { year, amount };
      } else {
        acc[year].amount += amount;
      }
    }
    return acc;
  }, {});

  // Convert grouped data to array
  const chartData = Object.values(groupedData);
  const lineData = Object.values(groupedDatayearly);

  console.log('ChartData:', chartData);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Total Income Bar Chart */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Total Income Chart</h1>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", padding: "10px" }} />
              <Bar dataKey="amount" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Yearly Income Line Chart */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Yearly Income Chart</h1>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="year" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", padding: "10px" }} />
              <Line type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminTincomeC;