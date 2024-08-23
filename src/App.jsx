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
import { selectcheckuser } from './features/auth/authSlice'
import { fetchcartbyidaync } from './features/cart/cartslice'
import Orderpage from './pages/orderpage'
import Userorder from './features/user/components/Userorder'
import { fetchuserinfoAync } from './features/user/userSlice'
import Userprofilepage from './pages/Userprofilepage'
import Adminproductlist from './features/admin/Adminproductlist/adminproductlist'
import Adminprotected from './features/admin/adminauth/Adminprotected'
import Adminproductdetail from './features/admin/Adminproductlist/Adminproductdetail/Adminproductdetail'

function App() {

  let dispach = useDispatch()
  let userid = useSelector(selectcheckuser)
  console.log("app" , userid)
  useEffect(()=>
    {
      if(userid){
        dispach(fetchcartbyidaync(userid.id))
        dispach(fetchuserinfoAync(userid.id))
      }
    }, [dispach,userid])

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
      path: '/admin/home',
      element: (
        <>
          <Adminprotected>
          <Nav />
          <Adminproductlist />
          </Adminprotected>
        </>
      ),
    },
    {
      path: '/admin/adminproductdetail',
      element: (
        <>
          <Adminprotected>
          <Nav />
          <Adminproductdetail />
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
  ]);


  return (

    <>
        
        <RouterProvider router={router} >
        </RouterProvider>

        
    </>
  )
}

export default App
