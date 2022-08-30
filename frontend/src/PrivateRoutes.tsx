import { Outlet, Navigate } from 'react-router-dom';
import { Status } from './interfaces/Status';
import { useAppSelector } from './hooks/use-redux';

const PrivateRoutes = ({ allowedRoles }: { allowedRoles: string }) => {
  const { token, role, status } = useAppSelector((state) => state.auth);

  return token && role === allowedRoles && status === Status.Active ? (
    <Outlet />
  ) : (
    <Navigate to="signin" />
  );
};

export default PrivateRoutes;
