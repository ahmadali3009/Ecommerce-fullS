import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectcart } from '../cart/cartslice';

const navigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'Admin', to: '/admin/home', current: false },
  { name: 'Shop', to: '/shop', current: false },
  { name: 'Contact', to: '/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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

  return (
    <nav
    className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
      scrolling ? 'bg-white/30 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}
  >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" />
            <span className="text-white text-xl font-bold tracking-wide">My Store</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={classNames(
                  item.current ? 'text-indigo-400' : 'text-black hover:text-indigo-400 transition',
                  'text-lg font-medium'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart & Profile */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-7 w-7 text-black hover:text-indigo-400 transition" />
              {cartProduct.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cartProduct.length}
                </span>
              )}
            </Link>

            {/* Profile Menu */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center">
                <img
                  className="h-9 w-9 rounded-full border-2 border-indigo-400"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                <MenuItem>
                  {({ active }) => (
                    <Link to="/userprofile" className={`block px-4 py-2 text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                      Your Profile
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link to="/userorder" className={`block px-4 py-2 text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                      Your Orders
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link to="/login" className={`block px-4 py-2 text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                      Sign Out
                    </Link>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>

          {/* Mobile Menu */}
          <Disclosure as="div" className="md:hidden">
            {({ open }) => (
              <>
                <DisclosureButton className="text-white">
                  {open ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </DisclosureButton>
                <DisclosurePanel className="absolute top-20 left-0 w-full bg-gray-800 shadow-lg">
                  <div className="px-4 py-3 space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className="block text-white text-lg py-2 px-4 hover:bg-gray-700 rounded-md"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
