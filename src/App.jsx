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
import Productdetail from './pages/productdetail'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Nav />
          <Home />
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
          <Nav />
          <Signupoage />
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
          <Nav />
          <Cartpage />
        </>
      ),
    },
    {
      path: '/checkout',
      element: (
        <>
          <Nav />
          <Cheakout />
        </>
      ),
    },
    {
      path: '/productdetail',
      element: (
        <>
          <Nav />
          <Productdetail />
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
