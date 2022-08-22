import { Menu } from 'antd';
import { useAppSelector } from 'app/hooks';
import { IUser } from 'features/authentication/types';
import { selectLayout } from 'features/layout/layoutSlice';
import { useNavigate } from 'react-router';
import iconMap from 'utils/iconMap';
import dashboardLinks from '../../../../pages/links';

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
      // style={{
      //   height: '100%',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   flexDirection: 'column',
      // }}
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
