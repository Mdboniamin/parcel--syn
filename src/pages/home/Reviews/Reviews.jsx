import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard/ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviewsData = use(reviewsPromise);

  return (
    <div className="my-24">
      <div className="text-center mb-12 md:mb-24 px-4">
        <h3 className="text-2xl md:text-3xl text-center font-bold my-4 md:my-8">
          Reviews
        </h3>
        <p className="...">
          See what our customers have to say about their delivery experience.
          From fast, reliable service to careful handling of every parcel, real
          feedback from real users.
        </p>
      </div>
      <>
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: "50%",
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="mySwiper"
        >
          {reviewsData.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
