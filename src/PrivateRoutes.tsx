import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Status } from './interfaces/Status';

const PrivateRoutes = ({ allowedRoles }: { allowedRoles: string }) => {
  const { token, role, status } = useSelector((state: any) => state.auth);

  return token && role === allowedRoles && status === Status.Active ? (
    <Outlet />
  ) : (
    <Navigate to="signin" />
  );
};

export default PrivateRoutes;
