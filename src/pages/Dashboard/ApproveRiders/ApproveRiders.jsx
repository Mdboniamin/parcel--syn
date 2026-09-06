import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  const updateRiderStatus = (rider, status) => {
    console.log(rider, status);
    const updateInfo = {
      status: status,
      email: rider.riderEmail,
    };
    axiosSecure.patch(`riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: `Rider Application has been ${status}`,
          showConfirmButton: false,
          icon: "success",
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };
  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };
  return (
    <div>
      <h2 className="text-2xl md:text-4xl lg:text-5xl">Riders Pending Approval: {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>{rider.riderName}</td>
                  <td>{rider.riderEmail}</td>
                  <td>{rider.riderDistrict}</td>
                  <td>
                    <p
                      className={`${
                        rider.status === "approved"
                          ? "text-green-800"
                          : "text-red-500"
                      }`}
                    >
                      {rider.status}
                    </p>
                  </td>
                  <td>{rider.workStatus}</td>
                  <td>
                    <button
                      onClick={() => handleApproval(rider)}
                      className="btn"
                    >
                      <FaCheckCircle />
                    </button>
                    <button className="btn">
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleRejection(rider)}
                      className="btn"
                    >
                      <IoIosRemoveCircle />
                    </button>
                    <button className="btn">
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
