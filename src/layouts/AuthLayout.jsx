import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <Logo></Logo>
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1 w-full">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 hidden md:block">
          <img src={authImage} alt="authImage" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
