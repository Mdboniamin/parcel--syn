import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignedParcels = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "riderAssigned"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?riderAssigned=true");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl md:text-4xl">
        Assigned Parcels: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Parcel</th>
              <th>Rider</th>
              <th>Rider Email</th>
              <th>Status</th>
              <th>Tracking ID</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.riderName}</td>
                <td>{parcel.riderEmail}</td>
                <td>{parcel.deliveryStatus?.split("_").join(" ")}</td>
                <td>{parcel.trackingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedParcels;