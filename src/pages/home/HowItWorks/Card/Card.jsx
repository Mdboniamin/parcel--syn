import React from "react";

const Card = ({ data }) => {
  return (
    <div className="card bg-white p-8 rounded-3xl">
      <img className="h-10 w-10" src={data.icon} alt={data.title} />
      <h1 className="font-bold text-xl">{data.title}</h1>
      <p className="text-gray-900">{data.subTitle}</p>
    </div>
  );
};

export default Card;
