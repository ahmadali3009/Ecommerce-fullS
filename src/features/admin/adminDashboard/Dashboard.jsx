import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import Orders from './Orders';
import Products from './Products';
import Settings from './Settings';

const Dashboard = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <nav className="flex flex-col p-4">
            <Link to="/admin" className="mb-4 p-2 hover:bg-gray-700">Dashboard Home</Link>
            <Link to="/admin/orders" className="mb-4 p-2 hover:bg-gray-700">Orders</Link>
            <Link to="/admin/products" className="mb-4 p-2 hover:bg-gray-700">Products</Link>
            <Link to="/admin/settings" className="mb-4 p-2 hover:bg-gray-700">Settings</Link>
          </nav>
        </div>

        {/* Main Content */}d
        <div className="flex-grow p-4">
          <Switch>
            <Route exact path="/admin" component={DashboardHome} />
            <Route path="/admin/orders" component={Orders} />
            <Route path="/admin/products" component={Products} />
            <Route path="/admin/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;