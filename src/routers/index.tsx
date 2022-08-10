import React from 'react';
import { RouteProps } from 'react-router-dom';

export interface HIASRoute extends RouteProps {
  isPublic?: boolean;
  isFullPage?: boolean;
}

const LoginPage = React.lazy(() => import('../pages/login'));
const ClientPage = React.lazy(() => import('../pages/client'));
const ServiceProviderPage = React.lazy(
  () => import('../pages/service-provider'),
);
const PolicyPage = React.lazy(() => import('../pages/policy'));
const BenefitPage = React.lazy(() => import('../pages/benefit'));
const EmployeePage = React.lazy(() => import('../pages/employee'));
// const MainLayout = React.lazy(() => import('../layouts/main-layout'));

const routes: HIASRoute[] = [
  {
    path: '/login',
    element: <LoginPage />,
    isPublic: true,
    isFullPage: true,
  },
  {
    path: '/client',
    element: <ClientPage />,
  },
  {
    path: '/service-provider',
    element: <ServiceProviderPage />,
  },
  {
    path: '/policy',
    element: <PolicyPage />,
  },
  {
    path: '/benefit',
    element: <BenefitPage />,
  },
  {
    path: '/employee',
    element: <EmployeePage />,
  },
];

export default routes;
