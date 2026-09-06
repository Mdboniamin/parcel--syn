import React from "react";

const FeatureCard = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-center gap-5 p-6 md:p-8 rounded-3xl card bg-white text-center md:text-left">
      <div>
        <img src={data.icon} alt="" />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold">{data.title}</h1>
        <p className="text-[#606060]">{data.subtitle}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
