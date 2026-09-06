import React from "react";
import Card from "./Card/Card";
import vanIcon from "../../../assets/delivery-van.png";

const HowItWorks = () => {
  const cardData = [
    {
      icon: vanIcon,
      title: "Booking Pick & Drop",
      subTitle:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: vanIcon,
      title: "Cash On Delivery",
      subTitle:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: vanIcon,
      title: "Delivery Hub",
      subTitle:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: vanIcon,
      title: "Booking SME & Corporate",
      subTitle:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="mt-12">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-8">How it Works</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((data, index) => (
          <Card key={index} data={data}></Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
