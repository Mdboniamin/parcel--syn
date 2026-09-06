import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Features from "../Features/Features";
import Reviews from "../Reviews/Reviews";
import Faqs from "../FAQS/Faqs";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <Brands></Brands>
      <Features></Features>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <Faqs></Faqs>
    </div>
  );
};

export default Home;
