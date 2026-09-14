import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["myPayments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const { data: activity = [] } = useQuery({
    queryKey: ["myActivity", user?.email],
    enabled: !!user?.email,
    refetchInterval: 15000, // poll every 15s for "live" updates
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/user/${user.email}`);
      return res.data;
    },
  });

  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const inTransit = parcels.filter(
    (p) => p.deliveryStatus && p.deliveryStatus !== "parcel_delivered"
  ).length;
  const delivered = parcels.filter(
    (p) => p.deliveryStatus === "parcel_delivered"
  ).length;

  return (
    <div>
      <h2 className="text-2xl md:text-4xl mb-4">User Dashboard</h2>

      {/* Stats */}
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Parcels</div>
          <div className="stat-value">{parcels.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">In Transit</div>
          <div className="stat-value">{inTransit}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Delivered</div>
          <div className="stat-value">{delivered}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Spent</div>
          <div className="stat-value">${totalSpent}</div>
        </div>
      </div>

      {/* Recent Parcels */}
      <h3 className="text-xl mt-6 mb-2">Recent Parcels</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Tracking ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.slice(0, 5).map((p) => (
              <tr key={p._id}>
                <td>{p.parcelName}</td>
                <td>{p.trackingId}</td>
                <td>{p.deliveryStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Activity */}
      <h3 className="text-xl mt-6 mb-2">Recent Activity</h3>
      <div className="space-y-2">
        {activity.length === 0 && (
          <p className="text-gray-500">No activity yet.</p>
        )}
        {activity.map((log) => (
          <div
            key={log._id}
            className="p-3 border rounded-lg flex justify-between items-center"
          >
            <div>
              <span className="font-medium">{log.parcelName}</span>{" "}
              <span className="text-sm text-gray-500">
                ({log.trackingId})
              </span>
              <p className="text-sm capitalize">
                {log.details || log.status.split("_").join(" ")}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatDistanceToNow(new Date(log.createdAt), {
                  addSuffix: true,
                })}
              </span>
              <Link
                to={`/parcel-track/${log.trackingId}`}
                className="text-xs text-primary hover:underline"
              >
                View full tracking →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardHome;