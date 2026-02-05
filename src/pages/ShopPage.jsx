import { Link } from "react-router-dom";
import Productlist from "../features/productsList/productlist";
import Footer from "../features/productsList/Footer";

const ShopPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Shop hero */}
      <section className="relative bg-stone-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-100">
              Shop
            </h1>
            <p className="mt-4 text-lg text-stone-300">
              Browse our full collection. Filter by category or brand and find what you love.
            </p>
            <nav className="mt-6 flex items-center justify-center gap-2 text-sm">
              <Link to="/" className="text-stone-400 hover:text-stone-200 transition-colors">
                Home
              </Link>
              <span className="text-stone-500">/</span>
              <span className="text-stone-200 font-medium">Shop</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="flex-grow">
        <Productlist />
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
