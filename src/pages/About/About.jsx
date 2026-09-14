import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
      <h2 className="text-3xl md:text-5xl font-bold mb-6">About ParcelSync</h2>

      <p className="text-lg mb-6">
        ParcelSync is a nationwide parcel delivery platform connecting
        senders, riders, and businesses through fast, reliable, and
        fully-trackable delivery — from pickup to doorstep.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="p-6 rounded-2xl border">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p>
            Make parcel delivery simple, transparent, and accessible for
            everyone — whether you're sending a single package or running a
            growing business.
          </p>
        </div>
        <div className="p-6 rounded-2xl border">
          <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
          <p>
            Every parcel is logged from creation to delivery, so you always
            know exactly where your shipment is and what's happening next.
          </p>
        </div>
        <div className="p-6 rounded-2xl border">
          <h3 className="text-xl font-semibold mb-2">Trusted Riders</h3>
          <p>
            Our riders are verified and approved before they can accept
            deliveries, so your parcels are always in safe hands.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-3">Why Choose Us</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Nationwide coverage across major districts</li>
          <li>Secure online payments with instant confirmation</li>
          <li>Live status updates at every step of delivery</li>
          <li>Dedicated support for both senders and riders</li>
        </ul>
      </div>
    </div>
  );
};

export default About;