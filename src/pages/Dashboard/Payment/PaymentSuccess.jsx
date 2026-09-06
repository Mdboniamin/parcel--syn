import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="card bg-base-100 shadow-xl p-6 md:p-10 max-w-lg w-full text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-green-500 mb-4">Payment Successful</h2>
        <p className="text-sm md:text-base mb-2">Your Transaction Id: <span className="font-semibold">{paymentInfo.transactionId}</span></p>
        <p className="text-sm md:text-base">Your Parcel Tracking Id: <span className="font-semibold">{paymentInfo.trackingId}</span></p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
