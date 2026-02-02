import { useSelector } from 'react-redux';
import { selectAllorder } from '../features/admin/adminDashboard/AdminOrderStatus/AdorderSSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const AdminTorderC = () => {
  const orders = useSelector(selectAllorder);

  // 1. Orders by Status Distribution
  const ordersByStatus = orders.response.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  console.log("ordersByStatus", ordersByStatus)
  const pieChartData = Object.entries(ordersByStatus).map(([status, count]) => ({
    name: status,
    value: count
  }));

  // 2. Orders by Time of Day
  const ordersByHour = orders.response.reduce((acc, order) => {
    const hour = new Date(order.createdAt).getHours();
    console.log("hour", hour)
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    orders: ordersByHour[i] || 0
  }));
  console.log("hourlydata", hourlyData)

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Distribution */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Order Status Distribution
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Time of Day */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Orders by Time of Day
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <XAxis 
                  dataKey="hour" 
                  tickFormatter={(hour) => `${hour}:00`}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(hour) => `${hour}:00`}
                  formatter={(value) => [`${value} orders`]}
                />
                <Bar 
                  dataKey="orders" 
                  fill="#6366F1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* You can add more charts here */}
      </div>
    </div>
  );
};

export default AdminTorderC
