import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

const PrivateRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
