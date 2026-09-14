import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
const axiosSecure = axios.create({
  baseURL: "https://my-parcel-sync-server.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  useEffect(() => {
    //intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(); // always fresh, auto-refreshes if near expiry
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );
    //interceptor response
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      },
    );

    //interceptor request
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
