import React from 'react';
import Productlist from '../features/productsList/productlist';
import Hero from '../features/productsList/Hero';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Hero />
      <div className="flex-grow bg-white py-4">
        <Productlist />
      </div>
    </div>
  );
};

export default Home;