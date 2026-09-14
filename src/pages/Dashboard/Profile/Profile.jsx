import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl md:text-4xl mb-6">My Profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <p className="text-xl font-semibold">{user?.displayName}</p>
          <span className="badge badge-primary capitalize">{role}</span>
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-2">
        <p>
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
        <p>
          <span className="font-semibold">Joined:</span>{" "}
          {profile?.createdAt &&
            new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>

      {role === "rider" && profile?.riderInfo && (
        <div className="rounded-2xl border p-4 space-y-2 mt-4">
          <h3 className="text-lg font-semibold mb-2">Rider Details</h3>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {profile.riderInfo.riderPhone}
          </p>
          <p>
            <span className="font-semibold">NID:</span>{" "}
            {profile.riderInfo.riderNid}
          </p>
          <p>
            <span className="font-semibold">Region:</span>{" "}
            {profile.riderInfo.riderRegion}
          </p>
          <p>
            <span className="font-semibold">District:</span>{" "}
            {profile.riderInfo.riderDistrict}
          </p>
          <p>
            <span className="font-semibold">Approval Status:</span>{" "}
            <span className="badge badge-success capitalize">
              {profile.riderInfo.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Work Status:</span>{" "}
            <span className="badge capitalize">
              {profile.riderInfo.workStatus}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;