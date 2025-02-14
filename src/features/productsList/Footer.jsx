import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gradient-to-r from-white to-gray-500 text-black mt-12 py-10">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div>
                <h2 className="text-xl font-bold">YourBrand</h2>
                <p className="mt-2 text-sm text-black">
                    The best place to find amazing products with great discounts.
                </p>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="mt-2 space-y-2 text-black">
                    <li><a href="#" className="hover:underline">Home</a></li>
                    <li><a href="#" className="hover:underline">Shop</a></li>
                    <li><a href="#" className="hover:underline">About Us</a></li>
                    <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
            </div>

            {/* Customer Service */}
            <div>
                <h3 className="text-lg font-semibold">Customer Service</h3>
                <ul className="mt-2 space-y-2 text-black">
                    <li><a href="#" className="hover:underline">FAQs</a></li>
                    <li><a href="#" className="hover:underline">Return Policy</a></li>
                    <li><a href="#" className="hover:underline">Shipping Info</a></li>
                    <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                </ul>
            </div>

            {/* Social Media */}
            <div>
                <h3 className="text-lg font-semibold">Follow Us</h3>
                <div className="flex mt-3 space-x-4">
                    <a href="#" className="text-gray-200 hover:text-white">
                        <i className="fab fa-facebook-f text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-200 hover:text-white">
                        <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-200 hover:text-white">
                        <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-200 hover:text-white">
                        <i className="fab fa-linkedin-in text-xl"></i>
                    </a>
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-300 mt-6 border-t border-gray-500 pt-4 text-sm">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
    </div>
</footer>

    </div>
  )
}

export default Footer
