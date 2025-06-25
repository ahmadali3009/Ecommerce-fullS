import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectcart } from '../cart/cartslice';

const navigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'Admin', to: '/admin/home', current: false },
  { name: 'Shop', to: '/shop', current: false },
  { name: 'Contact', to: '/contact', current: false },
];

const Nav = () => {
  const cartProduct = useSelector(selectcart);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleSignOut = () => {
    
    console.log('User signed out');
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
        scrolling 
          ? 'bg-stone-600 backdrop-blur-lg shadow-lg' 
          : 'bg-stone-800' // Changed to match footer
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <img 
                className="relative h-10 w-auto" 
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" 
                alt="Logo" 
              />
            </div>
            <span className={`text-xl font-bold tracking-wide ${scrolling ? 'text-white' : 'text-white'} group-hover:text-indigo-400 transition-colors duration-200`}>
              My Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`relative text-lg font-medium group ${
                  scrolling 
                    ? 'text-gray-900 hover:text-indigo-600' 
                    : 'text-gray-100 hover:text-white'
                }`}
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            ))}
          </div>

          {/* Cart & Profile */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative group">
              <ShoppingCartIcon className={`h-7 w-7 transition-colors duration-200 ${
                scrolling ? 'text-gray-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-300'
              }`} />
              {cartProduct.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartProduct.length}
                </span>
              )}
            </Link>

            {/* Profile Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center group">
                <div className="relative">
                  <div className="absolute -inset-1 "></div>
                  <img
                    className="relative h-9 w-9 rounded-full object-cover border-2"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                </div>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ">
                <Menu.Item>
                  {({ active }) => (
                    <Link to="/userprofile" className={`block px-4 py-2 text-sm ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}>
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link to="/userorder" className={`block px-4 py-2 text-sm ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}>
                      Your Orders
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link to="/login" onClick={handleSignOut} className={`block px-4 py-2 text-sm ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}>
                      Sign Out

                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          {/* Mobile Menu */}
          <Disclosure as="div" className="md:hidden">
            {({ open }) => (
              <>
                <Disclosure.Button className={`p-2 rounded-lg ${
                  scrolling ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-xl">
                  <div className="px-4 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
