import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
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
      className="w-full h-[650px] relative"
    >
      <SwiperSlide>
        <div className="relative w-full h-[650px]">
          <img
            src={eyesImg}
            alt="Banner 1"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold mb-2 animate-fadeIn">
              Unleash Your Beauty
            </h1>
            <p className="text-lg opacity-90 animate-fadeIn delay-200">
              Discover the perfect look for every occasion.
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-[650px]">
          <img
            src={fragranceImg}
            alt="Banner 2"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold mb-2 animate-fadeIn">
              Elevate Your Senses
            </h1>
            <p className="text-lg opacity-90 animate-fadeIn delay-200">
              Indulge in luxury fragrances that define you.
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;
