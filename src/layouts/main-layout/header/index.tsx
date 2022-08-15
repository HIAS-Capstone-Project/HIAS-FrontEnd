import { Layout } from 'antd';
import { useAppSelector } from 'app/hooks';
import HeaderAvatar from 'components/avatar';
import Hamburger from 'components/hamburger';
import { selectLayout } from 'features/layout/layoutSlice';
import styles from './header.module.css';
const { Header } = Layout;

const LayoutHeader = () => {
  const layout = useAppSelector(selectLayout);
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
        <HeaderAvatar />
      </Header>
    </>
  );
};

export default LayoutHeader;
