import { Button, Layout, Space } from 'antd';
import { useAppSelector } from 'app/hooks';
import HeaderAvatar from 'components/avatar';
import Hamburger from 'components/hamburger';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { selectLayout } from 'features/layout/layoutSlice';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import ROLE from 'constants/roles';
const { Header } = Layout;

const LayoutHeader = () => {
  const layout = useAppSelector(selectLayout);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const computedStyle = () => {
    let styles;
    if (layout.sidebarCollapsed) {
      styles = {
        width: 'calc(100% - 80px)',
      };
    } else {
      styles = {
        width: 'calc(100% - 346.666666667px)',
      };
    }
    return styles;
  };
  return (
    <>
      <Header className={`${styles.antLayoutHeader}`} />
      <Header
        style={computedStyle()}
        className={`${styles.antLayoutHeader} ${styles.fixHeader}`}
      >
        <Hamburger />
        <Space direction="horizontal">
          {[ROLE.SERVICE_PROVIDER, ROLE.MEMBER].includes(user?.role) && (
            <Button
              size="large"
              type="primary"
              onClick={() => navigate('/create-claim')}
            >
              Tạo yêu cầu bồi thường
            </Button>
          )}
          <HeaderAvatar />
        </Space>
      </Header>
    </>
  );
};

export default LayoutHeader;
