import { Layout } from 'antd';
import Sider from './sider';
import Header from './header';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import httpProvider, { HttpResponse } from 'http/http-provider';
import { LocalStorageUtil } from 'utils';
import { ISession } from './../../utils/local-storage.util';

const MainLayout = () => {
  useEffect(() => {
    httpProvider.setupInterceptors((status: number, res: HttpResponse<any>) => {
      if (status === 401 || status === 403) {
        const resetSession: ISession = {};
        LocalStorageUtil.setSessionInfo(resetSession);
        window.location.href = '/login';
      }
    });
  }, []);

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
      </Layout>
    </Layout>
  );
};

export default MainLayout;
