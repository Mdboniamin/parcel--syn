import React from "react";

const Card = ({ data }) => {
  return (
    <div className="card px-6 py-8 bg-white flex flex-col gap-4 justify-center items-center">
      <img className="h-10 w-10" src={data.icon} alt="" />
      <h1 className="text-2xl font-bold text-black"> {data.title}</h1>
      <p className="text-sm text-gray-900">{data.subtitle}</p>
    </div>
  );
};

export default Card;
