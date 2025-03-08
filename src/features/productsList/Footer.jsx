import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                className="h-10 w-auto" 
                src="https://tailwindui.com/img/logos/mark.svg?color=stone&shade=200" 
                alt="Logo" 
              />
              <span className="text-xl font-bold text-stone-100">My Store</span>
            </div>
            <p className="text-stone-300 text-sm">
              Discover amazing products with great discounts. Your one-stop shop for quality and style.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-stone-400 hover:text-stone-200 transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Repeat for other social icons with same color scheme */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-100 text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Shop', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-stone-300 hover:text-stone-100 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-stone-100 text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {['FAQs', 'Shipping Info', 'Returns', 'Track Order'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-stone-300 hover:text-stone-100 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-stone-100 text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-stone-300 text-sm mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:outline-none focus:border-stone-500 placeholder-stone-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-600 text-stone-100 rounded-lg hover:bg-stone-500 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone-400 text-sm">
              © {new Date().getFullYear()} My Store. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-stone-400 hover:text-stone-200 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="#" className="text-stone-400 hover:text-stone-200 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="#" className="text-stone-400 hover:text-stone-200 text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
