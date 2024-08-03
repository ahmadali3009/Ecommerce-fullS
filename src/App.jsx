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
      path: '/productdetail/:id',
      element: (
        <>
          <Nav />
          <Producthistory />
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
