import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RiderDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: activeDeliveries = [] } = useQuery({
    queryKey: ["riderActive", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}`
      );
      return res.data;
    },
  });

  const { data: deliveryPerDay = [] } = useQuery({
    queryKey: ["riderDeliveryPerDay", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?email=${user.email}`
      );
      return res.data;
    },
  });

  const totalDelivered = deliveryPerDay.reduce(
    (sum, d) => sum + d.deliveredCount,
    0
  );

  return (
    <div>
      <h2 className="text-2xl md:text-4xl mb-4">Rider Dashboard</h2>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Active Deliveries</div>
          <div className="stat-value">{activeDeliveries.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Delivered</div>
          <div className="stat-value">{totalDelivered}</div>
        </div>
      </div>

      <h3 className="text-xl mt-6 mb-2">Deliveries Per Day</h3>
      <div className="w-full h-[300px]">
        <BarChart width={500} height={300} data={deliveryPerDay}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="deliveredCount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default RiderDashboardHome;