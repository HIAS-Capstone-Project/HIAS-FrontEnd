import { Layout } from 'antd';
import { useAppSelector } from 'app/hooks';
import { selectLayout } from 'features/layout/layoutSlice';
import Logo from './logo';
import styles from './sider.module.css';

const { Sider } = Layout;
const LayoutSider = () => {
  const layout = useAppSelector(selectLayout);
  return (
    <Sider
      width={346.666666667}
      // style={{
      //   background: 'linear-gradient(45deg, #8b5aed 0%, #78ebfc 100%)',
      //   borderRadius: '0 15px 15px 0',
      // }}
      theme="light"
      collapsible
      collapsed={layout.sidebarCollapsed}
      trigger={null}
    >
      <Logo />
      <div className={styles.sidebarMenuContainer}>{/* <Menu /> */}</div>
    </Sider>
  );
};

export default LayoutSider;
