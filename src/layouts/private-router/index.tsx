import React, { useEffect } from 'react';
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';
import { LocalStorageUtil } from 'utils';

const PrivateRouter: React.FC<any> = ({ component, ...rest }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const session = LocalStorageUtil.getSessionInfo();

  // need flag to check logined
  const isAuthenticate = session && !!session.token;

  useEffect(() => {
    if (isAuthenticate && location.pathname === 'login') {
      navigate('/home');
    }
  }, []);

  return (
    <Route
      {...rest}
      element={isAuthenticate ? component : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRouter;
