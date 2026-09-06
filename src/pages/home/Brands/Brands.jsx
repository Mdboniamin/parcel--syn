import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazonVc from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import redstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";
const brands = [amazon, amazonVc, casio, moonstar, redstad, star, startPeople];
const Brands = () => {
  return (
    <div className="mt-10">
      <h3 className="text-center text-2xl mb-10 font-bold">
        We've helped thousands of sales teams
      </h3>
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 25 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        pagination={{
          clickable: true,
        }}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <img src={brand} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
