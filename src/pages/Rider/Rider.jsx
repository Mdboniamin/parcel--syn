import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import agentPending from "../../assets/agentPending.png";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const riderRegion = useWatch({ control, name: "riderRegion" });
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
  const handleRiderApplication = (data) => {
    console.log(data);

    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          title:
            "Rider Application has been sent.we will reach to you in 45 days",
          showConfirmButton: false,
          icon: "success",
          timer: 2500,
        });
      }
    });
  };
  return (
    <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-6">
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-8 p-4 text-black w-full md:w-2/3 lg:w-1/2"
      >
        <h2 className="text-3xl md:text-4xl text-primary">Be a Rider</h2>
        <p className="text-sm md:text-base mt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        {/* two column  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* rider info  */}

          <fieldset className="fieldset">
            <h4 className="text-xl md:text-2xl font-semibold">
              Tell us about yourself
            </h4>
            {/* rider name  */}
            <label className="label">Rider Name</label>
            <input
              type="text"
              {...register("riderName")}
              defaultValue={user.displayName}
              className="input w-full"
              placeholder="Rider Name"
            />
            <label className="label">Rider Email</label>
            <input
              type="email"
              {...register("riderEmail")}
              defaultValue={user.email}
              className="input w-full"
              placeholder="Rider Email"
            />
            {/* rider address  */}
            <label className="label">Rider Age</label>
            <input
              type="text"
              {...register("riderAge")}
              className="input w-full"
              placeholder="Rider Age"
            />
            <label className="label">Nid</label>
            <input
              type="text"
              {...register("riderNid")}
              className="input w-full"
              placeholder="Nid"
            />
          </fieldset>
          <fieldset>
            <h2 className="text-xl md:text-2xl text-black">More Details</h2>
            {/* sernder region  */}
            <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend">Rider Regions</legend>
              <select
                {...register("riderRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* rider districts  */}
            <fieldset className="fieldset mt-4">
              <legend className="fieldset-legend">rider Districts</legend>
              <select
                {...register("riderDistrict")}
                defaultValue="Pick a District"
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>

                {districtsByRegion(riderRegion).map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* rider Phone  */}
            <label className="label mt-4">Phone Number</label>
            <input
              type="text"
              {...register("riderPhone")}
              className="input w-full"
              placeholder="Phone Number"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          value="Apply as a Rider"
          className="btn btn-primary text-black mt-4 w-full md:w-auto"
        />
      </form>
      <div className="w-full md:w-1/3 lg:w-1/2 flex justify-center items-center">
        <img
          className="h-56 w-full md:h-96 md:w-96 lg:h-[28rem] object-cover"
          src={agentPending}
          alt=""
        />
      </div>
    </div>
  );
};

export default Rider;
