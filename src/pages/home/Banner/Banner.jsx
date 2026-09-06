import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="mt-4 md:mt-8">
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <img src={bannerImg1} />
          <div className="relative ">
            <button className="btn btn-xs sm:btn-sm md:btn-md btn-primary text-black rounded-full absolute bottom-6 sm:bottom-12 md:bottom-18 left-4 sm:left-8 md:left-14">
              Track Your Parcel
            </button>
          </div>
          <div className="relative ">
            <button className="btn btn-xs sm:btn-sm md:btn-md btn-primary text-black rounded-full absolute bottom-6 sm:bottom-12 md:bottom-18 left-36 sm:left-40 md:left-50">
              Be A Rider
            </button>
          </div>
        </div>
        <div>
          <img src={bannerImg2} />
        </div>
        <div>
          <img src={bannerImg3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
