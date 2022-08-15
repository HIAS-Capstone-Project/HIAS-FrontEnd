import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from 'routers';
import Header from './header';
import Sider from './sider';
import Routes from 'constants/routes';
import Links from 'pages/links';
import { LocalStorageUtil } from 'utils';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isFullPage, setFullPage] = useState<boolean | undefined>(false);
  const user = useAppSelector(selectCurrentUser);
  const session = LocalStorageUtil.getSessionInfo();
  const isAuthenticate = session && !!session.token;
  const navigate = useNavigate();
  const index = user?.role ? user?.role : Routes.HOME;

  useEffect(() => {
    const currentRoute = routes.find(route => route.path === location.pathname);
    if (currentRoute) {
      setFullPage(currentRoute.isFullPage);
    }
  }, [location]);

  useEffect(() => {
    if (!isAuthenticate) {
      navigate(Routes.LOGIN);
    } else if (location.pathname === '/login') {
      navigate(Links[index][0].to);
    }
  }, [isAuthenticate, navigate]);

  if (isFullPage) return <>{children}</>;

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider />
      <Layout>
        <Header />
        {/* {tagsView ? <TagsView /> : null}
        <Content />
        <RightPanel /> */}
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
