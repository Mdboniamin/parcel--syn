import React from "react";
import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }
  if (role === "admin") {
    return <AdminDashboardHome />;
  } else if (role === "rider") {
    return <RiderDashboardHome />;
  } else {
    return <UserDashboardHome />;
  }
};

export default DashboardHome;
