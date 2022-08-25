import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { useAppSelector } from 'app/hooks';
import Routes from 'constants/routes';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { selectLayout } from 'features/layout/layoutSlice';
import Links from 'pages/links';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from 'routers';
import { LocalStorageUtil } from 'utils';
import Header from './header';
import Sider from './sider';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isFullPage, setFullPage] = useState<boolean | undefined>(false);
  const user = useAppSelector(selectCurrentUser);
  const layout = useAppSelector(selectLayout);
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

  const computedStyle = () => {
    let styles;
    if (layout.sidebarCollapsed) {
      styles = {
        left: '80px',
      };
    } else {
      styles = {
        left: '346.666666667px',
      };
    }
    return styles;
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider />
      <Layout
        style={{
          transition: 'left 0.2s',
          minWidth: '1500px',
          position: 'sticky',
          top: 0,
          ...computedStyle(),
        }}
      >
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
