import React from "react";
import { Navigate, Outlet } from "react-router";

export default function NotAuthRoutes({ isAuth }) {
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
}
