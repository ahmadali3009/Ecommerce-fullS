import React from 'react';
import Productlist from '../features/productsList/productlist';
import Hero from '../features/productsList/Hero';
import Footer from '../features/productsList/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Hero />
      <div className="flex-grow bg-white">
        <Productlist />
        <Footer/>
      </div>
    </div>
  );
};

export default Home;