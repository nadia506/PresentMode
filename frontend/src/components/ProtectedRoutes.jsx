import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
}
