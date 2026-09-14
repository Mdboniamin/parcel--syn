import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingParcel, setEditingParcel] = useState(null);

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const phonePattern = {
    value: /^01[3-9]\d{8}$/,
    message: "Enter a valid 11-digit phone number (e.g. 017XXXXXXXX)",
  };

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo,
    );
    window.location.assign(res.data.url);
  };

  const openEditModal = (parcel) => {
    setEditingParcel(parcel);
    reset({
      parcelName: parcel.parcelName,
      senderName: parcel.senderName,
      senderAddress: parcel.senderAddress,
      senderPhoneNumber: parcel.senderPhoneNumber,
      receiverName: parcel.receiverName,
      receiverAddress: parcel.receiverAddress,
      receiverPhoneNumber: parcel.receiverPhoneNumber,
    });
    document.getElementById("edit_parcel_modal").showModal();
  };

  const handleEditSubmit = (data) => {
    axiosSecure
      .patch(`/parcels/${editingParcel._id}/details`, data)
      .then((res) => {
        if (res.data.modifiedCount || res.data.matchedCount) {
          document.getElementById("edit_parcel_modal").close();
          refetch();
          Swal.fire({
            title: "Updated!",
            text: "Parcel details have been updated.",
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Failed",
          text: "Could not update parcel. It may already be paid.",
          icon: "error",
        });
      });
  };

  return (
    <div>
      <h2 className="text-2xl p-4"> All of My Parcels: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment </th>
              <th>Tracking ID </th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => {
              const isPaid = parcel.paymentStatus === "paid";
              return (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>
                    {isPaid ? (
                      <span className="text-green-400">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="btn btn-sm btn-primary text-black"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td>
                    <Link to={`/parcel-track/${parcel.trackingId}`}>
                      {parcel.trackingId}
                    </Link>
                  </td>
                  <td>{parcel.deliveryStatus}</td>
                  <td>
                    <Link
                      to={`/parcel-track/${parcel.trackingId}`}
                      className="btn btn-square hover:bg-primary"
                      title="Track parcel"
                    >
                      <FaRegEye />
                    </Link>
                    <button
                      onClick={() => openEditModal(parcel)}
                      disabled={isPaid}
                      className="btn btn-square hover:bg-primary mx-2 disabled:opacity-40 disabled:cursor-not-allowed"
                      title={
                        isPaid
                          ? "Cannot edit a paid parcel"
                          : "Edit parcel details"
                      }
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleParcelDelete(parcel._id)}
                      disabled={isPaid}
                      className="btn btn-square hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed"
                      title={
                        isPaid ? "Cannot delete a paid parcel" : "Delete parcel"
                      }
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Parcel Modal */}
      <dialog id="edit_parcel_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Edit Parcel Details</h3>

          <form
            onSubmit={handleSubmit(handleEditSubmit)}
            className="text-black space-y-3"
          >
            <fieldset className="fieldset">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName", {
                  required: "Parcel name is required",
                })}
                className="input w-full"
              />
              {errors.parcelName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcelName.message}
                </p>
              )}
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <h4 className="font-semibold">Sender</h4>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("senderName", {
                    required: "Sender name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                  className="input w-full"
                />
                {errors.senderName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderName.message}
                  </p>
                )}

                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("senderAddress", {
                    required: "Sender address is required",
                    minLength: { value: 5, message: "Min 5 characters" },
                  })}
                  className="input w-full"
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderAddress.message}
                  </p>
                )}

                <label className="label">Phone</label>
                <input
                  type="text"
                  {...register("senderPhoneNumber", {
                    required: "Sender phone is required",
                    pattern: phonePattern,
                  })}
                  className="input w-full"
                />
                {errors.senderPhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderPhoneNumber.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <h4 className="font-semibold">Receiver</h4>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("receiverName", {
                    required: "Receiver name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                  className="input w-full"
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverName.message}
                  </p>
                )}

                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("receiverAddress", {
                    required: "Receiver address is required",
                    minLength: { value: 5, message: "Min 5 characters" },
                  })}
                  className="input w-full"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverAddress.message}
                  </p>
                )}

                <label className="label">Phone</label>
                <input
                  type="text"
                  {...register("receiverPhoneNumber", {
                    required: "Receiver phone is required",
                    pattern: phonePattern,
                  })}
                  className="input w-full"
                />
                {errors.receiverPhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverPhoneNumber.message}
                  </p>
                )}
              </fieldset>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("edit_parcel_modal").close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary text-black">
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyParcels;
