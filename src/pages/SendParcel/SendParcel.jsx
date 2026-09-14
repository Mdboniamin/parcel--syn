import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, touchedFields, dirtyFields },
    handleSubmit,
    control,
  } = useForm({ mode: "onChange" });
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const parcelType = useWatch({ control, name: "parcelType" });

  // returns border/text color classes based on live validation state
  const getInputClass = (name) => {
    const hasError = errors[name];
    const isTouched = touchedFields[name] || dirtyFields[name];
    if (hasError) return "input w-full border-red-500 focus:outline-red-500";
    if (isTouched)
      return "input w-full border-green-500 focus:outline-green-500";
    return "input w-full";
  };

  const getSelectClass = (name) => {
    const hasError = errors[name];
    const isTouched = touchedFields[name] || dirtyFields[name];
    if (hasError) return "select w-full border-red-500 focus:outline-red-500";
    if (isTouched)
      return "select w-full border-green-500 focus:outline-green-500";
    return "select w-full";
  };

  const FieldError = ({ name }) =>
    errors[name] ? (
      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
        <span>⚠</span> {errors[name].message}
      </p>
    ) : touchedFields[name] || dirtyFields[name] ? (
      <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
        <span>✓</span> Looks good
      </p>
    ) : null;

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType == "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "top-end",
              title: "Parcel has created.Please Pay",
              showConfirmButton: false,
              icon: "success",
              timer: 2500,
            });
          }
        });
      }
    });
  };

  const phonePattern = {
    value: /^01[3-9]\d{8}$/,
    message: "Enter a valid 11-digit phone number (e.g. 017XXXXXXXX)",
  };

  const emailPattern = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email address",
  };

  return (
    <div>
      <h2 className="text-3xl md:text-5xl font-bold">Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-8 md:mt-12 p-4 text-black"
      >
        {/* parcel type  */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType", {
                required: "Please select a parcel type",
              })}
              value="document"
              className="radio"
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType", {
                required: "Please select a parcel type",
              })}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
          <FieldError name="parcelType" />
        </div>

        {/* parcel info name weight etc  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">
              Parcel Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("parcelName", {
                required: "Parcel name is required",
              })}
              className={getInputClass("parcelName")}
              placeholder="Parcel Name"
            />
            <FieldError name="parcelName" />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">
              Parcel Weight (kg){" "}
              {parcelType === "non-document" && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="number"
              step="0.01"
              {...register("parcelWeight", {
                validate: (value) => {
                  if (parcelType !== "non-document") return true;
                  if (!value) return "Parcel weight is required";
                  if (parseFloat(value) <= 0)
                    return "Weight must be greater than 0";
                  return true;
                },
              })}
              className={getInputClass("parcelWeight")}
              placeholder="Parcel Weight"
            />
            <FieldError name="parcelWeight" />
          </fieldset>
        </div>

        {/* two column  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info  */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>

            <label className="label">
              Sender Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("senderName", {
                required: "Sender name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              defaultValue={user.displayName}
              className={getInputClass("senderName")}
              placeholder="Sender Name"
            />
            <FieldError name="senderName" />

            <label className="label">
              Sender Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("senderEmail", {
                required: "Sender email is required",
                pattern: emailPattern,
              })}
              defaultValue={user.email}
              className={getInputClass("senderEmail")}
              placeholder="Sender Email"
            />
            <FieldError name="senderEmail" />

            <label className="label">
              Sender Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("senderAddress", {
                required: "Sender address is required",
                minLength: {
                  value: 5,
                  message: "Address must be at least 5 characters",
                },
              })}
              className={getInputClass("senderAddress")}
              placeholder="Sender Address"
            />
            <FieldError name="senderAddress" />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Sender Regions <span className="text-red-500">*</span>
              </legend>
              <select
                {...register("senderRegion", {
                  required: "Please select a region",
                })}
                defaultValue=""
                className={getSelectClass("senderRegion")}
              >
                <option value="" disabled>
                  Pick a region
                </option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <FieldError name="senderRegion" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Sender Districts <span className="text-red-500">*</span>
              </legend>
              <select
                {...register("senderDistrict", {
                  required: "Please select a district",
                })}
                defaultValue=""
                className={getSelectClass("senderDistrict")}
              >
                <option value="" disabled>
                  Pick a District
                </option>
                {districtsByRegion(senderRegion).map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <FieldError name="senderDistrict" />
            </fieldset>

            <label className="label">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("senderPhoneNumber", {
                required: "Sender phone number is required",
                pattern: phonePattern,
              })}
              className={getInputClass("senderPhoneNumber")}
              placeholder="Phone Number"
            />
            <FieldError name="senderPhoneNumber" />
          </fieldset>

          {/* receiver info  */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>

            <label className="label">
              Receiver Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("receiverName", {
                required: "Receiver name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className={getInputClass("receiverName")}
              placeholder="Receiver Name"
            />
            <FieldError name="receiverName" />

            <label className="label">
              Receiver Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("receiverEmail", {
                required: "Receiver email is required",
                pattern: emailPattern,
              })}
              className={getInputClass("receiverEmail")}
              placeholder="Receiver Email"
            />
            <FieldError name="receiverEmail" />

            <label className="label">
              Receiver Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("receiverAddress", {
                required: "Receiver address is required",
                minLength: {
                  value: 5,
                  message: "Address must be at least 5 characters",
                },
              })}
              className={getInputClass("receiverAddress")}
              placeholder="Receiver Address"
            />
            <FieldError name="receiverAddress" />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Receiver Regions <span className="text-red-500">*</span>
              </legend>
              <select
                {...register("receiverRegion", {
                  required: "Please select a region",
                })}
                defaultValue=""
                className={getSelectClass("receiverRegion")}
              >
                <option value="" disabled>
                  Pick a region
                </option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <FieldError name="receiverRegion" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Receiver District <span className="text-red-500">*</span>
              </legend>
              <select
                {...register("receiverDistrict", {
                  required: "Please select a district",
                })}
                defaultValue=""
                className={getSelectClass("receiverDistrict")}
              >
                <option value="" disabled>
                  Pick a District
                </option>
                {districtsByRegion(receiverRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <FieldError name="receiverDistrict" />
            </fieldset>

            <label className="label">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("receiverPhoneNumber", {
                required: "Receiver phone number is required",
                pattern: phonePattern,
              })}
              className={getInputClass("receiverPhoneNumber")}
              placeholder="Phone Number"
            />
            <FieldError name="receiverPhoneNumber" />
          </fieldset>
        </div>

        <input
          type="submit"
          value="Send Parcel"
          className="btn btn-primary text-black mt-4"
        />
      </form>
    </div>
  );
};

export default SendParcel;
