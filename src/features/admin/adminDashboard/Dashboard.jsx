import { Link, Outlet, useLocation } from "react-router-dom";
import { fectchAllOrderStatusasync } from "./AdminOrderStatus/AdorderSSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  ChartPieIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  UsersIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import DashboardOverview from './DashboardOverview';

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const navigation = [
    { name: 'Order Status', to: "orderStatus", icon: ShoppingBagIcon },
    { name: 'Total Orders', to: "TorderC", icon: ChartPieIcon },
    { name: 'Income Analytics', to: "TincomeC", icon: CurrencyDollarIcon },
    { name: 'User Statistics', to: "TuserC", icon: UsersIcon },
  ];

  useEffect(() => {
    dispatch(fectchAllOrderStatusasync());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="px-4">
            <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
          </div>
          <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
            {navigation.map((item) => {
              const isActive = location.pathname.includes(item.to);
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile menu */}
      <div className="md:hidden">
        {/* Add mobile menu implementation here */}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="py-6">
          <div className="px-4 sm:px-6 md:px-8">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
                  Dashboard
                </h1>
              </div>
            </div>
            <DashboardOverview />
            <div className="mt-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
