import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="card bg-base-100 shadow-xl p-6 md:p-10 max-w-lg w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">Payment is Cancelled</h2>
        <Link to="/dashboard/my-parcels">
          <button className="btn btn-primary text-black">Try Again</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;
