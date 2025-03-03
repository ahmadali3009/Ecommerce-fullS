import { Link, Outlet } from "react-router-dom";
import { fectchAllOrderStatusasync } from "./AdminOrderStatus/AdorderSSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Dashboard = () => {

  let dispach = useDispatch()

  useEffect(() => {
      dispach(fectchAllOrderStatusasync())
    }, [dispach])
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="orderStatus" className="p-2 bg-gray-800 rounded hover:bg-gray-700">Order Status</Link>
          <Link to="TorderC" className="p-2 bg-gray-800 rounded hover:bg-gray-700">Total Order info</Link>
          <Link to="TincomeC" className="p-2 bg-gray-800 rounded hover:bg-gray-700">TOTAL INCOME INFO</Link>
          <Link to="TuserC" className="p-2 bg-gray-800 rounded hover:bg-gray-700">Total user info</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
