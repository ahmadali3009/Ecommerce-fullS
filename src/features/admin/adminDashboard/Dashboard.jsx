import { Link, Outlet, useLocation } from "react-router-dom";
import { fectchAllOrderStatusasync } from "./AdminOrderStatus/AdorderSSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { 
  ChartPieIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  UsersIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import DashboardOverview from './DashboardOverview';

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Order Status', to: "orderStatus", icon: ShoppingBagIcon },
    { name: 'Total Orders', to: "TorderC", icon: ChartPieIcon },
    { name: 'Income Analytics', to: "TincomeC", icon: CurrencyDollarIcon },
    { name: 'User Statistics', to: "TuserC", icon: UsersIcon },
  ];

  useEffect(() => {
    dispatch(fectchAllOrderStatusasync());
  }, [dispatch]);

  const NavigationLinks = () => (
    navigation.map((item) => {
      const isActive = location.pathname.includes(item.to);
      return (
        <Link
          key={item.name}
          to={item.to}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`${
            isActive
              ? 'bg-stone-800 text-white'
              : 'text-gray-600 hover:bg-stone-700 hover:text-white'
          } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
        >
          <item.icon
            className={`${
              isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
            } mr-3 flex-shrink-0 h-6 w-6`}
          />
          {item.name}
        </Link>
      );
    })
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="px-4">
            <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
          </div>
          <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
            <NavigationLinks />
          </nav>
        </div>
      </aside>

      {/* Mobile menu */}
      <div className="md:hidden">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-24 left-4 z-40 p-2 rounded-md bg-stone-800 text-white"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile menu sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-24">
            <div className="px-4">
              <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
            </div>
            <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
              <NavigationLinks />
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="py-6 md:py-6">
          <div className="px-4 sm:px-6 md:px-8">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between mt-16 md:mt-0">
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
