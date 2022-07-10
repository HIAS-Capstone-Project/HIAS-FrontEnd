import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import routes from 'routers';
import Header from './header';
import Sider from './sider';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isFullPage, setFullPage] = useState<boolean | undefined>(false);

  useEffect(() => {
    const currentRoute = routes.find(route => route.path === location.pathname);
    if (currentRoute) {
      setFullPage(currentRoute.isFullPage);
    }
  }, [location]);

  // useEffect(() => {
  //   httpProvider.setupInterceptors((status: number, res: HttpResponse<any>) => {
  //     if (status === 401 || status === 403) {
  //       const resetSession: ISession = {};
  //       LocalStorageUtil.setSessionInfo(resetSession);
  //       if (window.location.href.includes(Routes.LOGIN)) return;
  //       window.location.href = Routes.LOGIN;
  //       return;
  //     }
  //   });
  // }, []);

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
