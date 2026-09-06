import React from "react";
import FeatureCard from "./FeatureCard/FeatureCard";
import liveTrackingIcon from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safeDelivery.png";
const Features = () => {
  const featuresData = [
    {
      icon: liveTrackingIcon,
      title: "Live Parcel Tracking",
      subtitle:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      icon: safeDelivery,
      title: "100% Safe Delivery",
      subtitle:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      icon: safeDelivery,
      title: "24/7 Call Center Support",
      subtitle:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];
  return (
    <div className="flex flex-col gap-5 my-10">
      {featuresData.map((data, index) => (
        <FeatureCard key={index} data={data}></FeatureCard>
      ))}
    </div>
  );
};

export default Features;
