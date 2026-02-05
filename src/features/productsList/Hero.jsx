import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import eyesImg from "../../assets/eyes.jpg";
import fragranceImg from "../../assets/fragrance.jpg";

const Hero = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full min-h-[40vh] sm:min-h-[50vh] lg:h-[550px] relative"
    >
      <SwiperSlide>
        <div className="relative w-full min-h-[40vh] sm:min-h-[50vh] lg:h-[550px]">
          <img
            src={eyesImg}
            alt="Banner 1"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 animate-fadeIn">
              Unleash Your Beauty
            </h1>
            <p className="text-base sm:text-lg opacity-90 animate-fadeIn delay-200 mb-6">
              Discover the perfect look for every occasion.
            </p>
            <div className="flex flex-wrap gap-3 justify-center animate-fadeIn delay-300">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
              >
                Shop Now
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full min-h-[40vh] sm:min-h-[50vh] lg:h-[550px]">
          <img
            src={fragranceImg}
            alt="Banner 2"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 animate-fadeIn">
              Elevate Your Senses
            </h1>
            <p className="text-base sm:text-lg opacity-90 animate-fadeIn delay-200 mb-6">
              Indulge in luxury fragrances that define you.
            </p>
            <div className="flex flex-wrap gap-3 justify-center animate-fadeIn delay-300">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
              >
                Shop Now
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-gray-900"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;
