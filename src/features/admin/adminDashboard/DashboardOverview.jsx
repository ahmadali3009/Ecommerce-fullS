import { useSelector } from 'react-redux';
import { selectAllorder } from './AdminOrderStatus/AdorderSSlice';
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

const DashboardOverview = () => {
  const orders = useSelector(selectAllorder);

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${orders?.response?.reduce((acc, order) => acc + parseFloat(order.totalAmount), 0).toFixed(2) || 0}`,
      icon: CurrencyDollarIcon,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Total Orders',
      value: orders?.response?.length || 0,
      icon: ShoppingBagIcon,
      change: '+5.2%',
      changeType: 'positive',
    },
    // Add more stats as needed
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {item.changeType === 'positive' ? (
                <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
              ) : (
                <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
              )}
              <span className="ml-1">{item.change}</span>
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
};

export default DashboardOverview;