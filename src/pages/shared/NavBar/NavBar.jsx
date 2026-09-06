import React from "react";
import Logo from "../../../components/Logo/Logo";

import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };
  const links = (
    <>
      <li>
        <NavLink to={""}>Services</NavLink>
      </li>

      <li>
        <NavLink to={"/send-parcel"}>Send a Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage Areas</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={"/dashboard/my-parcels"}>My Parcels</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={""}>About us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm px-3 md:px-8 py-3 md:py-5 rounded-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <button className="btn btn-ghost text-xl">
          <Logo></Logo>
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <button onClick={handleLogOut} className="btn btn-sm md:btn-md">
            Log Out
          </button>
        ) : (
          <Link to={"/login"} className="btn btn-sm md:btn-md">
            Log in
          </Link>
        )}
        <Link to={"/rider"} className="btn btn-sm md:btn-md btn-primary text-black">
          <span className="hidden sm:inline">Be a rider</span>
          <span className="sm:hidden">Rider</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
