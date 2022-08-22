import React from 'react';
import { Button, Menu } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'app/hooks';
import { selectLayout } from 'features/layout/layoutSlice';
import { IUser } from 'features/authentication/types';
import dashboardLinks from '../../../../pages/links';
import { useNavigate } from 'react-router';
import iconMap from 'utils/iconMap';

interface IAccountMenu {
  user: IUser | null;
}

function getItem(
  label: string,
  key: string,
  icon: any,
  children: any = null,
  type: any = null,
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const AccountMenu = ({ currentUser }: any) => {
  const layout = useAppSelector(selectLayout);
  const tabs = currentUser ? dashboardLinks[currentUser?.role] : [];
  const navigate = useNavigate();
  const items = tabs.map((link: any, item: string) => {
    return getItem(link.name, item, iconMap[link.name]);
  });

  const handleClick = (e: any) => {
    navigate(tabs[e.key].to);
  };

  return (
    <Menu
      defaultSelectedKeys={['0']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      inlineCollapsed={layout.sidebarCollapsed}
      items={items}
      onClick={handleClick}
    />
  );
};

export default AccountMenu;
