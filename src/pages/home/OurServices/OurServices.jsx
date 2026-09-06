import React from "react";
import serviceIcn from "../../../assets/service.png";
import Card from "./Card/Card";

const OurServices = () => {
  const cardData = [
    {
      icon: serviceIcn,
      title: "Express  & Standard Delivery",
      subtitle:
        "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
    },
    {
      icon: serviceIcn,
      title: "Nationwide Delivery",
      subtitle:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
    },
    {
      icon: serviceIcn,
      title: "Fulfillment Solution",
      subtitle:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: serviceIcn,
      title: "Cash on Home Delivery",
      subtitle:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: serviceIcn,
      title: "Corporate Service / Contract In Logistics",
      subtitle:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: serviceIcn,
      title: "Parcel Return",
      subtitle:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <div className="px-4 py-6 md:px-16 md:py-16 lg:px-24 lg:py-24 rounded-4xl mt-12 md:mt-24 bg-secondary text-center text-white">
      <div className="p-4 md:px-12 lg:px-40 mb-4">
        <h1 className="text-2xl md:text-4xl font-extrabold mt-2.5">Our Services</h1>
        <p className="text-sm ">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((data, index) => (
          <Card key={index} data={data}></Card>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
