import { useEffect, useState } from 'react'
import './App.css'
import Loginpage from './pages/loginpage'
import Signupoage from './pages/signupoage'
import Nav from './features/navbar/nav'
import Home from './pages/home'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import Cartpage from './pages/cartpage'
import Cheakout from './pages/cheakout'
import Producthistory from './pages/producthistory'
import Protected from './features/auth/components/protected'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthAsync, selectcheckuser, selectUserChecked } from './features/auth/authSlice'
import { fetchcartbyidaync } from './features/cart/cartslice'
import Orderpage from './pages/orderpage'
import Userorder from './features/user/components/Userorder'
import { fetchuserinfoAync } from './features/user/userSlice'
import Userprofilepage from './pages/Userprofilepage'
import Adminprotected from './features/admin/adminauth/Adminprotected'
import Adminhome from './pages/adminhome'
import Adminproducthistory from './pages/adminproducthistory'
import Addproductform from './features/admin/Adminproductlist/Addproductform'
import { fetchallproductsAycn } from './features/productsList/prodectSlice'
import StripeCheckout from './pages/stripepage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import Dashboard from './features/admin/adminDashboard/Dashboard'
import Adminorderstatus from './pages/adminorderstatus'
import AdminTorderC from './pages/adminTorderC'
import AdminTincomeC from './pages/adminTincomeC'
import AdminTotaluserC from './pages/adminTotaluserC'

function App() {

  let dispach = useDispatch()
  let user = useSelector(selectcheckuser)
  console.log("app" , user)

  const userChecked = useSelector(selectUserChecked);
  useEffect(()=>{
    dispach(checkAuthAsync())
  },[dispach])

  useEffect(()=>
    {
      if(user){
        dispach(fetchuserinfoAync())
        // dispach(fetchallproductsAycn())
      }
    }, [dispach,user])

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Protected>
          <Nav />
          <Home />
          </Protected>
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
          <Protected>
          <Nav />
          <Signupoage />
          </Protected>

        </>
      ),
    },
    {
      path: '/login',
      element: (
        <>
          <Nav />
          <Loginpage />
        </>
      ),
    },
    {
      path: '/cart',
      element: (
        <>
          <Protected>
          <Nav />
          <Cartpage />
          </Protected>
        </>
      ),
    },
    {
      path: '/checkout',
      element: (
        <>
          <Protected>
          <Nav />
          <Cheakout />
          </Protected>
        </>
      ),
    },
    {
      path: '/orderpage',
      element: (
        <>
          <Protected>
          <Nav />
          <Orderpage />
          </Protected>

        </>
      ),
    },
    {
      path: '/order-success/:id',
      element: (
        <Protected>
          <OrderSuccessPage></OrderSuccessPage>{' '}
        </Protected>
      ),
    },
    {
      path: '/userorder',
      element: (
        <>
          <Protected>
          <Nav />
          <Userorder />
          </Protected>
{/* add this userorder page in page section later  */}
        </>
      ),
    },
    {
      path: '/userprofile',
      element: (
        <>
          <Protected>
          <Nav />
          <Userprofilepage />
          </Protected>
        </>
      ),
    },
    {
      path: '/stripe-checkout',
      element: (
        <>
          <Protected>
          <Nav />
          <StripeCheckout />
          </Protected>
        </>
      ),
    },
    {
      path: '/admin/home',
      element: (
        <>
          <Adminprotected>
          <Nav />
          <Adminhome />
          </Adminprotected>
        </>
      ),
    },
    {
      path: '/admin/addproduct',
      element: (
        <>
          <Adminprotected>
          <Nav />
          <Addproductform />
          </Adminprotected>
          {/* pagemissing */}
        </>
      ),
    },
    // {
    //   path: '/admin/dashboard',
    //   element: (
    //     <>
    //       <Adminprotected>
    //       <Nav />
    //       <Dashboard />
    //       </Adminprotected>
    //       {/* pagemissing */}
    //     </>
    //   ),
    // },
    {
      path: '/admin/adminproductdetail/:id',
      element: (
        <>
          <Adminprotected>
          <Nav />
          <Addproductform />
          </Adminprotected>
        </>
      ),
    },
    {
      path: '/productdetail/:id',
      element: (
        <>
          <Protected>
          <Nav />
          <Producthistory />
          </Protected>
        </>
      ),
    },
    {
      path: "/admin/dashboard",
      element:  (<Adminprotected>
      <Nav />
      <Dashboard />
      </Adminprotected>),
      children: [
        { path: "orderStatus", element: <Adminorderstatus /> },
        { path: "TorderC", element: <AdminTorderC /> },
        { path: "TincomeC", element: <AdminTincomeC /> },
        { path: "TuserC", element: <AdminTotaluserC /> },
      ],
    },

  ]);

  


  return (

    <>
        
        {userChecked && <RouterProvider router={router} >
        </RouterProvider>}

        
    </>
  )
}

export default App
