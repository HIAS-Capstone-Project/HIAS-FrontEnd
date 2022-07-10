import Routes from 'constants/routes';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LocalStorageUtil } from 'utils';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const session = LocalStorageUtil.getSessionInfo();
  const user = useSelector(selectCurrentUser);

  // need flag to check logined
  const isAuthenticate = session && !!session.token && user?.isLogined;

  if (!isAuthenticate) return <Navigate to={Routes.LOGIN} replace />;

  return <>{children}</>;
};

export default PrivateRoute;
