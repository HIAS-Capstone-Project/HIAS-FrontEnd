import { Layout } from 'antd';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { selectLayout } from 'features/layout/layoutSlice';
import AccountMenu from './AccountMenu';
import Logo from './logo';
import styles from './sider.module.css';

const { Sider } = Layout;
const LayoutSider = () => {
  const layout = useAppSelector(selectLayout);
  const user = useAppSelector(selectCurrentUser);

  return (
    <Sider
      width={346.666666667}
      // style={{
      //   background: 'linear-gradient(45deg, #8b5aed 0%, #78ebfc 100%)',
      //   borderRadius: '0 15px 15px 0',
      // }}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
      theme="light"
      collapsible
      collapsed={layout.sidebarCollapsed}
      trigger={null}
    >
      <Logo />
      <div className={styles.sidebarMenuContainer}>
        <AccountMenu currentUser={user} />
      </div>
    </Sider>
  );
};

export default LayoutSider;
