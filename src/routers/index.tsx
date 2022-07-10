import React from 'react';
import { RouteProps } from 'react-router-dom';

export interface HIASRoute extends RouteProps {
  isPublic?: boolean;
  isFullPage?: boolean;
}

const LoginPage = React.lazy(() => import('../pages/login'));
// const MainLayout = React.lazy(() => import('../layouts/main-layout'));

const routes: HIASRoute[] = [
  {
    path: '/login',
    element: <LoginPage />,
    isPublic: true,
    isFullPage: true,
  },
  {
    path: '/',
    element: <LoginPage />,
  },
];

export default routes;
