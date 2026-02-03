import Productlist from '../features/productsList/productlist';
import Hero from '../features/productsList/Hero';
import Footer from '../features/productsList/Footer';
import { selectcheckuser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Home = () => {
    const checkuser = useSelector(selectcheckuser)
    if (!checkuser) {
        return <Navigate to="/login" replace={true} />;
    }
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