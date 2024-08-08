import { useState } from 'react'
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

function App() {
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
